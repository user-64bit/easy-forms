"use server";

import { Question } from "@/app/components/form-builder/form-builder";
import db from "@/db";

export const getFormDataAction = async ({ formId }: { formId: number }) => {
  try {
    const form = await db.form.findUnique({
      where: {
        id: formId,
      },
      include: {
        questions: {
          include: {
            optionsList: true,
          },
        },
      },
    });
    const title = form?.title || "No Form";
    const questions =
      form?.questions.map((question: Question) => {
        return {
          id: question.id,
          title: question.title,
          helpText: question.helpText,
          type: question.type,
          optionsList:
            question?.optionsList?.map((option: any) => ({
              id: option.id,
              option: option.option,
            })) || [],
        };
      }) || [];
    return { title, questions };
  } catch (error) {
    console.error("Error getting form data:", error);
    throw error;
  }
};
