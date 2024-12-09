"use server";

import { Answer } from "@/app/components/submit-form/submit-form";
import db from "@/db";

export const submitAnswerAction = async ({
  formId,
  answers,
}: {
  formId: number;
  answers: Answer[];
}) => {
  try {
    const updatedAnswers = answers.map((answer) => {
      return {
        formId: formId,
        questionId: answer.id,
        answer: answer.answer,
      };
    });
    console.log("updatedAnswers", updatedAnswers);
    const data = await db.answer.createMany({
      data: updatedAnswers,
    });
    return data;
  } catch (error) {
    console.error("Error submitting answer:", error);
    throw error;
  }
};
