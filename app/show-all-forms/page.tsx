import { getAllForms } from "@/actions/getAllForms";
import FormCard from "../components/form-card/form-card";

export default async function ShowAllForms() {
  const allForms = await getAllForms();
  console.log("data", allForms);
  return (
    <div className="w-full sm:w-[640px] mx-auto flex flex-col items-center justify-center">
      {allForms.map((form) => {
        return (
          <FormCard
            key={form.id}
            title={form.title}
            questions={form.questions.map((question) => question.title)}
            answers={form.Answer.map((answer) => answer.answer)}
          />
        );
      })}
    </div>
  );
}
