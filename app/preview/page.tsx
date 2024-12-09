"use client";

import FormBuilder, { Question } from "../components/form-builder/form-builder";
import Header from "../components/header/header";
import Root from "../components/root/root";
import { useAppSelector } from "../redux/hooks";

export default function Preview() {
  const questions: Question[] = useAppSelector(
    (state) => state.persistedReducer.data.questions
  );
  return (
    <Root>
      <Header />
      <FormBuilder questions={questions} previewMode={true} />
    </Root>
  );
}
