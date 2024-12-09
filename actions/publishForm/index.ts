"use server";

import { Question } from "@/app/components/form-builder/form-builder";
import db from "@/db";

enum QuestionType {
  shortAnswer = "shortAnswer",
  longAnswer = "longAnswer",
  singleSelect = "singleSelect",
  date = "date",
  url = "url",
}

export const publishFormAction = async ({
  title,
  formQuestions,
}: {
  title: string;
  formQuestions: Question[];
}) => {
  const isValidType = (type: string): type is QuestionType => {
    return Object.values(QuestionType).includes(type as QuestionType);
  };

  try {
    const form = await db.form.create({
      data: {
        title: title,
        questions: {
          create: formQuestions.map((question) => {
            if (!isValidType(question.type!)) {
              throw new Error(`Invalid question type: ${question.type}`);
            }
            return {
              title: question.title,
              helpText: question.helpText || null,
              type: question.type,
              optionsList: {
                create:
                  question.optionsList?.map((option) => ({
                    option: option.option,
                  })) || [],
              },
            };
          }),
        },
      },
    });
    return form;
  } catch (error) {
    console.error("Error creating form:", error);
    throw error;
  }
};
