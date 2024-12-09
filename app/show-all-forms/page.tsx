"use client";

import { getAllForms } from "@/actions/getAllForms";
import FormCard from "../components/form-card/form-card";
import { useEffect, useState } from "react";

export default function ShowAllFormsPage() {
  const [allForms, setAllForms] = useState<any>([]);
  useEffect(() => {
    getAllForms().then((forms) => {
      setAllForms(forms);
    });
  }, []);
  return (
    <div className="w-full sm:w-[640px] mx-auto flex flex-col items-center justify-center">
      <div className="mb-8">
        {allForms.map((form: any) => {
          return (
            <FormCard
              key={form.id}
              title={form.title}
              questions={form.questions.map((question: any) => question.title)}
              answers={form.Answer.map((answer: any) => answer.answer)}
            />
          );
        })}
      </div>
    </div>
  );
}
