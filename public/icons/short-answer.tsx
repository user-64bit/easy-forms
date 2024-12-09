export default function ShortAnswerIcon({
  className,
  color,
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={color || "none"}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.5 7.5H10.8333"
        stroke="#0D0D0D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="#0D0D0D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
