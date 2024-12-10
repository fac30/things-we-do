import { Header } from "@/ui/shared/Header";

export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header title="Question 000000000000" />
      <section>{children}</section>
    </>
  );
}
