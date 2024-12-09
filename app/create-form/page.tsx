"use client";

import { publishFormAction } from "@/actions/publishForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Footer from "../components/footer/footer";
import FormBuilder, { Question } from "../components/form-builder/form-builder";
import Header from "../components/header/header";
import Root from "../components/root/root";
import { reset, setQuestions } from "../redux/form/formSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function CreateForm() {
  const router = useRouter();
  const questions = useAppSelector(
    (state) => state.persistedReducer.data.questions
  );
  const title = useAppSelector(
    (state) => state.persistedReducer.data.formTitle
  );
  useEffect(() => {
    dispatch(reset());
  }, []);
  const dispatch = useAppDispatch();
  const isQuestionValidated = (questions: Question[]) => {
    if (questions.length === 0) {
      toast.info("Please add at least one question");
      return false;
    }
    if (title === "") {
      toast.info("Please enter a title for your form");
      return false;
    }
    const questionCopy = [...questions];
    const data = questionCopy.map((question) => {
      const obj = { ...question };
      if (!obj.title) {
        obj.isValid = false;
      } else {
        obj.isValid = true;
      }
      if (obj.type === "singleSelect") {
        obj.isValid =
          obj?.optionsList?.filter((option) => option.option !== "").length ===
          obj.optionsList?.length;
      }
      return obj;
    });
    const isValid = data.every((question) => question.isValid);
    if (!isValid) {
      dispatch(setQuestions(data));
      return false;
    }
    return true;
  };
  const handleFormPublish = async () => {
    if (isQuestionValidated(questions)) {
      try {
        const form = await publishFormAction({
          title: title,
          formQuestions: questions,
        });
        router.push(`/submit-form/${form.id}`);
        dispatch(reset());
      } catch (error) {
        console.error("Error publishing form:", error);
      } finally {
      }
    }
  };
  const handlePreview = () => {
    if (isQuestionValidated(questions)) {
      console.log("Preview form");
      window.open("/preview", "_blank");
    }
  };

  return (
    <Root>
      <Header handlePreview={handlePreview} />
      <FormBuilder questions={questions} previewMode={false} />
      <Footer handleFormPublish={handleFormPublish} />
    </Root>
  );
}
