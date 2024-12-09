import { useAppSelector } from "@/app/redux/hooks";

export default function FormProgressBar() {
  const completePercentage = useAppSelector(
    (state) => state.persistedReducer.data.formCompletness
  );
  return (
    <div className="w-[50%]">
      <div className="text-[14px] text-end mb-[8px]">
        Form Completeness - {completePercentage}%
      </div>
      <div className="relative">
        <div className="bg-gray-200 z-[-99999] h-[4px] rounded-[4px] absolute top-0 right-0 left-0"></div>
        <div
          className={`bg-green-400 h-[4px] rounded-[4px]`}
          style={{ width: `${completePercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
