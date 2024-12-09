import { Question } from "@/app/components/form-builder/form-builder";
import { Answer } from "@/app/types/answerType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FormState = {
  questions: Question[];
  formTitle: string;
  answers: Answer[];
  formCompletness: number;
};

const initialState = {
  formTitle: "",
  questions: [],
  answers: [],
  formCompletness: 0,
} as FormState;

export const form = createSlice({
  name: "form",
  initialState,
  reducers: {
    reset: () => initialState,
    setFormTitle: (state, action: PayloadAction<string>) => {
      state.formTitle = action.payload;
    },
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.questions.push(action.payload);
    },
    updateQuestion: (state, action: PayloadAction<Question>) => {
      const questionIndex = state.questions.findIndex(
        (q) => q.id === action.payload.id
      );
      state.questions[questionIndex] = action.payload;
    },
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    setAnswer: (state, action: PayloadAction<Answer>) => {
      const answerIndex = state.answers.findIndex(
        (a) => a.id === action.payload.id
      );
      if (answerIndex >= 0) {
        state.answers[answerIndex] = action.payload;
      } else {
        state.answers.push(action.payload);
      }
      const filteredAnswers = state.answers.filter(
        (a) => a.isValid === true && a.answer !== ""
      );
      const completness = filteredAnswers.length / state.questions.length;
      state.formCompletness = Math.round(100 * completness);
    },
    setAllAnswers: (state, action: PayloadAction<Answer[]>) => {
      state.answers = action.payload;
    },
  },
});

export const {
  setFormTitle,
  addQuestion,
  setAnswer,
  setAllAnswers,
  updateQuestion,
  setQuestions,
  reset,
} = form.actions;
export default form.reducer;
