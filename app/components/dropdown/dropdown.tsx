import { useState } from "react";
import { motion } from "framer-motion";

export default function Dropdown({
  options,
  handleOnClick,
  selectedOption,
  SelectedIcon,
}: {
  options: { label: string; icon: any }[];
  handleOnClick: (index: number) => void;
  selectedOption: number;
  SelectedIcon: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative bg-white z-[99999]">
      <div className="flex opacity-40" role="button" onClick={() => setIsOpen(!isOpen)}>
        <SelectedIcon />
        <img src="/icons/dropdown-icon.png" />
      </div>
      {isOpen && (
        <motion.div
          style={{ position: "relative" }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ type: "linear", duration: 0.3 }}
          exit={{ height: 0, opacity: 0, transition: { duration: 0.3 } }}
        >
          <div className="w-[292px] absolute top-[20px] right-0 p-[4px] border bg-white rounded-[16px]">
            <div className="px-[16px] py-[10px] text-gray-500 text-[12px] font-semibold tracking-[1px] bg-gray-50 rounded-[8px] uppercase">
              Input Types
            </div>
            {options.map(({ label, icon: Icon }, index) => (
              <div
                className={`flex p-[8px] items-center hover:bg-gray-100 rounded-[8px] mb-1 ${
                  selectedOption === index ? "bg-gray-100" : ""
                }`}
                key={label}
                role="button"
                onClick={() => {
                  handleOnClick(index);
                  setIsOpen(false);
                }}
              >
                <div className="mr-[8px] inline-block">
                  <Icon />
                </div>
                <div className="text-[14px] leading-[20px] font-semibold text-gray-950">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
