import {
  addQuestion,
  setQuestions,
  updateQuestion,
} from "@/app/redux/form/formSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import AppButton from "../app-button/app-button";
import FormBuilderItem from "../form-builder-item/form-builder-item";
import { motion } from "framer-motion";
import AddQuestionIcon from "@/public/icons/add-question";
import { colors } from "@/app/assets/color";
import { toast } from "react-toastify";

export interface Question {
  id?: number;
  title: string | "";
  helpText: string | null;
  type?: "shortAnswer" | "longAnswer" | "singleSelect" | "url" | "date";
  optionsList?: { id?: number; option: string }[];
  previewMode?: boolean;
  isValid?: boolean;
}

const DropIndicator = ({ beforeId }: { beforeId: string | undefined }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={"form-indicator"}
      className="my-0.5 h-0.5 w-full bg-green-400 opacity-0"
    />
  );
};

export default function FormBuilder({
  questions,
  previewMode,
}: {
  questions: Question[];
  previewMode: boolean;
}) {
  const dispatch = useAppDispatch();
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const questionId = e.dataTransfer.getData("questionId");
    clearHighlights();
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";
    if (before !== questionId) {
      let copy = [...questions];

      let questionToTransfer = copy.find(
        (q) => q.id?.toString() === questionId
      );
      if (!questionToTransfer) return;
      questionToTransfer = { ...questionToTransfer };

      copy = copy.filter((q) => q.id?.toString() !== questionId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(questionToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, questionToTransfer);
      }
      dispatch(setQuestions(copy));
    }
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    clearHighlights();
  };
  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };
  const clearHighlights = (els?: any) => {
    const indicators = els || getIndicators();

    indicators.forEach((i: any) => {
      i.style.opacity = "0";
    });
  };
  const getNearestIndicator = (e: any, indicators: any) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest: any, child: any) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };
  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(`[data-column="form-indicator"]`)
    );
  };
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("questionId", id);
  };

  const handleQuestionChange = (updatedQuestion: Question) => {
    dispatch(updateQuestion(updatedQuestion));
  };

  const createQuestion = () => {
    dispatch(
      addQuestion({
        title: "",
        helpText: "",
        type: "shortAnswer",
        id: questions.length,
      })
    );
  };
  return (
    <div className="mb-auto m-[24px] overflow-y-scroll no-scrollbar h-screen">
      {questions.map((question) => (
        <div key={question.id}>
          <motion.div
            style={{ position: "relative" }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ type: "spring", duration: 1 }}
          >
            <DropIndicator beforeId={question.id?.toString() || ""} />
            <div
              draggable={!previewMode}
              onDragStart={(e) =>
                handleDragStart(e, question?.id?.toString() || "")
              }
              onDrop={handleDragEnd}
              onDragLeave={handleDragLeave}
              onDragOver={(e) => handleDragOver(e)}
              className={`${!previewMode && "cursor-grab"}`}
            >
              <FormBuilderItem
                question={question}
                handleQuestionChange={handleQuestionChange}
                previewMode={previewMode}
              />
            </div>
          </motion.div>
        </div>
      ))}
      {!previewMode && (
        <div
          className={`flex justify-center ${
            questions.length > 0 ? "my-[24px]" : ""
          }`}
        >
          <AppButton
            title="Add Question"
            IconLeft={AddQuestionIcon}
            onClick={createQuestion}
          />
        </div>
      )}
      {previewMode && (
        <div className="flex justify-end mt-[24px]">
          <AppButton
            title="Submit"
            backgroundColor={colors["green-400"]}
            textColor={colors["gray-00"]}
            onClick={() => {
              toast.success("Submitted successfully (Preview)");
            }}
          />
        </div>
      )}
    </div>
  );
}
