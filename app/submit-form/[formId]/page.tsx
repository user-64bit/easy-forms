import { getFormDataAction } from "@/actions/getFormData";
import SubmitForm from "@/app/components/submit-form/submit-form";

export interface QuestionSubmit {
  id?: number;
  title: string;
  helpText: string | null;
  type?: "shortAnswer" | "longAnswer" | "singleSelect" | "url" | "date";
  optionsList?: { id: number; option: string }[];
}

export default async function SubmitFormPage({ params }: any) {
  const param = await params;
  const { title, questions } = await getFormDataAction({
    formId: Number(params.formId),
  });
  return (
    <SubmitForm
      formId={Number(param.formId)}
      title={title || "No Form"}
      questions={questions}
    />
  );
}
