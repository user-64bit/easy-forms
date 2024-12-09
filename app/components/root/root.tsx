export default function Root({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full sm:w-[640px] flex flex-col h-screen mx-auto border">
      {children}
    </div>
  );
}
