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
        <div className="h-64 w-11/12 absolute top-1/2 left-1/2 bg-gray-800 border-[1.5px] rounded-lg -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col w-full items-center py-10 justify-between h-full">
            <h2 className="text-2xl w-10/12 text-center">{title}</h2>
            <div className="flex justify-center gap-10 w-2/3">
              {backButton && (
                <Button
                  onClick={backButton.action}
                  label={backButton.label}
                  className="text-xl font-normal w-32 bg-gray-700"
                />
              )}
              {forwardButton && (
                <Button
                  onClick={forwardButton.action}
                  label={forwardButton.label}
                  className="bg-twd-primary-purple text-xl font-normal w-32"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
