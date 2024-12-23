"use server";

import db from "@/db";

export const getAllForms = async () => {
  const data = await db.form.findMany({
    include: {
      questions: true,
      Answer: true,
    },
    orderBy:{
      createdAt: "desc"
    }
  });
  console.log("data", data);
  return data;
};
