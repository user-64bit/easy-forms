import DateAnswerIcon from "@/public/icons/date-answer";
import LongAnswerIcon from "@/public/icons/long-answer";
import ShortAnswerIcon from "@/public/icons/short-answer";
import SingleSelectAnswerIcon from "@/public/icons/single-select-answer";
import UrlAnswerIcon from "@/public/icons/url-answer";
import { useState } from "react";
import DateAnswer from "../answers/date-answer/date-answer";
import LongAnswer from "../answers/long-answer/long-answer";
import ShortAnswer from "../answers/short-answer/short-answer";
import SingleSelectAnswer from "../answers/single-select-answer/single-select-answer";
import UrlAnswer from "../answers/url-answer/url-answer";
import Dropdown from "../dropdown/dropdown";
import { Question } from "../form-builder/form-builder";

const OPTIONS = [
  {
    label: "Short Answer",
    icon: ShortAnswerIcon,
  },
  {
    label: "Long Answer",
    icon: LongAnswerIcon,
  },
  {
    label: "Single Select",
    icon: SingleSelectAnswerIcon,
  },
  {
    label: "URL",
    icon: UrlAnswerIcon,
  },
  {
    label: "Date",
    icon: DateAnswerIcon,
  },
];
const indexToOption: { [key: number]: TypeOption } = {
  0: "shortAnswer",
  1: "longAnswer",
  2: "singleSelect",
  3: "url",
  4: "date",
};
const optionToIndex: { [key: string]: number } = {
  shortAnswer: 0,
  longAnswer: 1,
  singleSelect: 2,
  url: 3,
  date: 4,
};
type TypeOption =
  | "shortAnswer"
  | "longAnswer"
  | "singleSelect"
  | "url"
  | "date";
export default function FormBuilderItem({
  question,
  handleQuestionChange,
  previewMode,
}: {
  question: Question;
  handleQuestionChange?: (updatedQuestion: Question) => void;
  previewMode: boolean;
}) {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleDropdownClick = (index: number) => {
    setSelectedOption(index);
    handleQuestionChange?.({
      ...question,
      type: indexToOption[index] as TypeOption,
      optionsList: [{ option: "" }, { option: "" }],
    });
  };
  const renderComponent = () => {
    switch (question.type) {
      case "shortAnswer":
        return (
          <ShortAnswer questionId={question.id!} previewMode={previewMode} />
        );
      case "longAnswer":
        return (
          <LongAnswer questionId={question.id!} previewMode={previewMode} />
        );
      case "singleSelect":
        return (
          <SingleSelectAnswer
            handleQuestionChange={handleQuestionChange!}
            question={question}
            previewMode={previewMode}
          />
        );
      case "url":
        return (
          <UrlAnswer questionId={question.id!} previewMode={previewMode} />
        );
      case "date":
        return (
          <DateAnswer questionId={question.id!} previewMode={previewMode} />
        );
      default:
        return (
          <ShortAnswer questionId={question.id!} previewMode={previewMode} />
        );
    }
  };
  return (
    <div
      className={`mb-[16px] ${question.isValid === false && "border-red-300"} ${
        !previewMode && "p-[16px] border border-gray-200 rounded-[16px]"
      }`}
    >
      <div className={`flex ${previewMode ? "mb-[4px]" : "mb-[8px]"}`}>
        <div className="flex flex-col flex-1">
          <input
            className={`placeholder:text-gray-400 bg-transparent ${
              question.isValid === false && "placeholder:text-red-300"
            } outline-none`}
            value={question.title}
            onChange={(e) =>
              handleQuestionChange?.({
                ...question,
                title: e.target.value,
                isValid: true,
              })
            }
            placeholder={
              selectedOption === 3
                ? "Link to your best your work."
                : "Write a question"
            }
            disabled={previewMode}
          />
          {((previewMode &&
            question.helpText &&
            question.helpText.length > 0) ||
            !previewMode) && (
            <input
              onChange={(e) =>
                handleQuestionChange?.({
                  ...question,
                  helpText: e.target.value,
                })
              }
              value={question.helpText || ""}
              disabled={previewMode}
              className="placeholder:text-gray-400 text-[12px] outline-none py-[4px] bg-transparent"
              placeholder="Write a help text or caption (leave empty if not needed)."
            />
          )}
        </div>
        <div className={`flex items-center ${previewMode ? "invisible" : ""}`}>
          <Dropdown
            options={OPTIONS}
            SelectedIcon={OPTIONS[optionToIndex[question.type || "shortAnswer"]].icon}
            selectedOption={optionToIndex[question.type || "shortAnswer"]}
            handleOnClick={handleDropdownClick}
          />
          <img src="/icons/reorder-icon.png" role="button" />
        </div>
      </div>

      {renderComponent()}
    </div>
  );
}
