"use client";

import { submitAnswerAction } from "@/actions/submitAnswer";
import { colors } from "@/app/assets/color";
import FormProgressBar from "@/app/components/form-progressbar/form-progressbar";
import { reset, setAllAnswers, setQuestions } from "@/app/redux/form/formSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { QuestionSubmit } from "@/app/submit-form/[formId]/page";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../../components/header/header";
import Root from "../../components/root/root";
import AppButton from "../app-button/app-button";
import FormBuilderItem from "../form-builder-item/form-builder-item";

export interface Answer {
  id: number;
  answer: string;
  isValid?: boolean;
}
export default function SubmitForm({
  formId,
  questions,
  title,
}: {
  formId: number;
  questions: QuestionSubmit[];
  title: string;
}) {
  const answers = useAppSelector(
    (state) => state.persistedReducer.data.answers
  );
  const dispatch = useAppDispatch();
  const isAnswerValidated = (answers: Answer[]) => {
    const answerCopy = [...answers];
    const data = answerCopy.map((question) => {
      const obj = { ...question };
      if (!obj.answer) {
        obj.isValid = false;
      } else {
        obj.isValid = true;
      }
      return obj;
    });
    const isValid = data.every((question) => question.isValid);
    if (!isValid) {
      dispatch(setAllAnswers(data));
      return false;
    }
    return true;
  };
  const onSubmit = async () => {
    if (isAnswerValidated(answers)) {
      await submitAnswerAction({
        formId: formId,
        answers: answers,
      });
      dispatch(reset());
      toast.success("Submitted successfully");
    }
  };
  useEffect(() => {
    dispatch(reset());
  }, []);
  useEffect(() => {
    dispatch(setQuestions(questions));
  }, [questions]);
  return (
    <Root>
      <Header
        title={title}
        previewMode={true}
        renderRightComponent={() => <FormProgressBar />}
      />
      <div className="mb-auto m-[24px] overflow-y-scroll no-scrollbar h-screen">
        {questions.length > 0 &&
          questions.map((question) => (
            <FormBuilderItem
              key={question.id}
              question={question}
              previewMode={true}
            />
          ))}
        {questions.length === 0 && (
          <div className="flex justify-center items-center">
            <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-green-400 rounded-full"></div>
          </div>
        )}
        {questions.length > 0 && (
          <div className="flex justify-end mt-[24px]">
            <AppButton
              title="Submit"
              backgroundColor={colors["green-400"]}
              textColor={colors["gray-00"]}
              onClick={onSubmit}
            />
          </div>
        )}
      </div>
    </Root>
  );
}
