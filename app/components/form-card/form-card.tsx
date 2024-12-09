export default function FormCard({
  title,
  questions,
  answers,
}: {
  title: string;
  questions: string[];
  answers: string[];
}) {
  return (
    <div className="w-full sm:w-[640px] mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold text-center mb-6">{title}</h2>
      <div className="space-y-4">
        {questions.map((question, index) => {
          return (
            <div
              key={index}
              className={`flex justify-between ${
                questions.length - 1 !== index && "border-b"
              }`}
            >
              <p className="text-gray-500 text-sm">{question}</p>
              <p className="text-gray-700 text-lg">{answers[index]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
