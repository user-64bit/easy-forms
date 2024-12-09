import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./date-answer-style.css";
import { setAnswer } from "@/app/redux/form/formSlice";
import { motion } from "framer-motion";

export default function DateAnswer({
  questionId,
  previewMode,
}: {
  questionId: number;
  previewMode: boolean;
}) {
  function formatToMMDDYYYY(dateString: Date) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }
  const dispatch = useAppDispatch();
  const date = useAppSelector((state) =>
    state.persistedReducer.data.answers.find((a) => a.id === questionId)
  );
  return (
    <motion.div
      style={{ position: "relative" }}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ type: "linear", duration: 0.5 }}
    >
      <DatePicker
        wrapperClassName="customDatePickerWidth"
        className={`h-[32px] w-full border border-gray-200 bg-gray-100 rounded-[8px] outline-none px-[8px] text-[14px] placeholder:text-gray-400 ${
          previewMode ? "" : "cursor-not-allowed"
        } ${previewMode && "bg-white"} ${
          date?.isValid === false && "border-red-300"
        }`}
        value={date?.answer}
        dateFormat="MM-DD-YYYY"
        placeholderText="MM-DD-YYYY"
        onChange={(date) =>
          dispatch(
            setAnswer({
              id: questionId,
              answer: formatToMMDDYYYY(date as Date),
              isValid: true,
            })
          )
        }
        disabled={!previewMode}
      />
      <img
        src="/icons/date-input.png"
        className={`absolute right-[8px] top-[8px] ${
          previewMode && "opacity-50"
        }`}
      />
    </motion.div>
  );
}
