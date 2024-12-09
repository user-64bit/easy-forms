import { setAnswer } from "@/app/redux/form/formSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Question } from "../../form-builder/form-builder";
import CheckRadioIcon from "@/public/icons/check-radio";
import UncheckRadioIcon from "@/public/icons/uncheck-radio";
import AddQuestionIcon from "@/public/icons/add-question";

export default function SingleSelectAnswer({
  handleQuestionChange,
  question,
  previewMode,
}: {
  handleQuestionChange: (updatedQuestion: Question) => void;
  question: Question;
  previewMode: boolean;
}) {
  const selectedOption = useAppSelector((state) =>
    state.persistedReducer.data.answers.find((a) => a.id === question.id)
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (previewMode) {
      dispatch(
        setAnswer({
          id: question.id!,
          answer: question.optionsList![0].option,
          isValid: true,
        })
      );
    }
  }, [question]);
  return (
    <motion.div
      style={{ position: "relative" }}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ type: "linear", duration: 0.5 }}
    >
      {" "}
      {question?.optionsList &&
        question.optionsList?.map((option, index) => (
          <div
            className={`flex items-center ${
              previewMode ? "mb-[4px]" : "mb-[8px]"
            }`}
            onClick={() => {
              dispatch(
                setAnswer({
                  id: question.id!,
                  answer: option.option,
                  isValid: true,
                })
              );
            }}
            role="button"
            key={index}
          >
            {selectedOption &&
            selectedOption?.answer === option.option &&
            previewMode ? (
              <CheckRadioIcon
                className={`my-[7px] ${
                  previewMode ? "" : "cursor-not-allowed mr-[8px]"
                }`}
              />
            ) : (
              <UncheckRadioIcon
                className={`my-[7px] ${
                  previewMode ? "" : "cursor-not-allowed mr-[8px]"
                }`}
              />
            )}

            <input
              className={`outline-none h-[32px] text-[14px] flex-1 placeholder:text-gray-400 ${
                previewMode
                  ? "bg-transparent px-[4px]"
                  : "border border-gray-200 rounded-[8px] px-[8px]"
              }`}
              placeholder={"Option " + (index + 1)}
              value={option.option}
              onChange={(e) =>
                question.optionsList &&
                handleQuestionChange({
                  ...question,
                  optionsList: [
                    ...question?.optionsList.slice(0, index),
                    { option: e.target.value },
                    ...question?.optionsList.slice(index + 1),
                  ],
                  isValid: true,
                })
              }
              disabled={previewMode}
            />
            {question?.optionsList &&
              question?.optionsList.length - 1 === index &&
              !previewMode && (
                <div
                  className={`h-[16px] my-[8px] ml-[8px]`}
                  role="button"
                  onClick={() => {
                    question.optionsList &&
                      handleQuestionChange({
                        ...question,
                        optionsList: [...question?.optionsList, { option: "" }],
                      });
                  }}
                >
                  <AddQuestionIcon />
                </div>
              )}
          </div>
        ))}
    </motion.div>
  );
}
