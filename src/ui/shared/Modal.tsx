import Button from "./Button";

interface ModalProps {
  modalOpen: boolean;
  //   setModalOpen: (value: boolean) => void;
  title: string;
  forwardButton?: {
    label: string;
    action: () => void;
    className: string;
  };
  backButton?: {
    label: string;
    action: () => void;
    className: string;
  };
}

export default function Modal({
  modalOpen,
  title,
  forwardButton,
  backButton,
}: ModalProps) {
  return (
    <>
      {modalOpen && (
        <div className="h-64 w-11/12 absolute top-1/2 left-1/2 bg-twd-secondary-purple border-white border-solid border-2 rounded-3xl -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col w-full items-center py-10 justify-between h-full">
            <h2 className="text-xl">{title}</h2>
            <div className="flex justify-between">
              {forwardButton && (
                <Button
                  onClick={forwardButton.action}
                  label={forwardButton.label}
                  className={forwardButton.className}
                />
              )}
              {backButton && (
                <Button
                  onClick={backButton.action}
                  label={backButton.label}
                  className={backButton.label}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
