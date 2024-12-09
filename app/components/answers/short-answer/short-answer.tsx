import { setAnswer } from "@/app/redux/form/formSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { motion } from "framer-motion";

export default function ShortAnswer({
  questionId,

  previewMode,
}: {
  questionId: number;
  previewMode: boolean;
}) {
  const dispatch = useAppDispatch();
  const shortAnswer = useAppSelector((state) =>
    state.persistedReducer.data.answers.find((a) => a.id === questionId)
  );
  console.log(shortAnswer);
  return (
    <motion.div
      style={{ position: "relative" }}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ type: "linear", duration: 0.5 }}
    >
      <input
        type="text"
        className={`h-[32px] w-full border border-gray-200 bg-gray-100 rounded-[8px] outline-none px-[8px] text-[14px] placeholder:text-gray-400 ${
          previewMode ? "" : "cursor-not-allowed"
        } ${previewMode && "bg-white"} ${
          shortAnswer?.isValid === false && "border-red-300"
        }`}
        value={shortAnswer?.answer || ""}
        onChange={(e) =>
          dispatch(
            setAnswer({ id: questionId, answer: e.target.value, isValid: true })
          )
        }
        disabled={!previewMode}
      />
    </motion.div>
  );
}
