import Link from "next/link";
import AppButton from "./components/app-button/app-button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
        Welcome to Easy Forms
      </h1>
      <p className="mb-8 max-w-lg text-lg text-muted-foreground">
        Easy Forms is a free and open-source form builder that allows you to
        create forms quickly and easily. It&apos;s built with Next.js and
        Tailwind CSS and is fully customizable.
      </p>
      <Link href="/create-form">
        <AppButton
          title="Try Easy forms 🤗"
          backgroundColor="black"
          textColor="white"
        />
      </Link>
    </div>
  );
}
