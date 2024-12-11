import Modal from "@/ui/shared/Modal";

export default function QuestionsModal({ modalOpen }) {
  return (
    <>
      {modalOpen && (
        <>
          <h1>hello</h1>
          <Modal />
        </>
      )}
    </>
  );
}
