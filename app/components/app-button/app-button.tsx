"use client";
import { useState } from "react";

export default function AppButton({
  title,
  iconRight,
  IconLeft,
  backgroundColor,
  textColor,
  borderColor,
  onClick,
}: {
  title: string;
  iconRight?: string;
  IconLeft?: React.FC<React.SVGProps<SVGSVGElement>>;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  onClick?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (onClick) {
      setIsLoading(true);
      await onClick();
      setIsLoading(false);
    }
  };
  return (
    <div
      className={`h-[32px] border px-[16px] rounded-[12px] flex items-center`}
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
      role="button"
      onClick={handleClick}
    >
      {!isLoading ? (
        <>
          <div className="mr-[4px]">{IconLeft && <IconLeft />}</div>
          <div
            className={`text-[14px] font-semibold`}
            style={{
              color: textColor,
            }}
          >
            {title}
          </div>
          <div>{iconRight && <img src={iconRight} className="ml-[4px]" />}</div>
        </>
      ) : (
        <div className="">
          <div className="animate-spin h-4 w-4 border border-t-transparent border-gray-200 rounded-full"></div>
        </div>
      )}
    </div>
  );
}
