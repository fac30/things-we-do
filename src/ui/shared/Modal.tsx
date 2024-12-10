import Button from "./Button";

interface ModalProps {
  inputModal?: boolean;
  placeholder?: string;
  modalOpen: boolean;
  title?: string;
  forwardButton?: {
    label: string;
    action: () => void;
  };
  backButton?: {
    label: string;
    action: () => void;
  };
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Modal({
  inputModal,
  placeholder,
  modalOpen,
  title,
  forwardButton,
  backButton,
  handleInputChange,
}: ModalProps) {
  if (inputModal && (!placeholder || !handleInputChange)) {
    throw new Error(
      "Both `placeholder` and `handleInputChange` are required when `inputModal` is true."
    );
  }

  return (
    <>
      {modalOpen && (
        <div className="h-64 w-11/12 absolute top-1/2 left-1/2 bg-gray-800 border-[1.5px] rounded-lg -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col w-full items-center py-10 justify-between h-full">
            {inputModal ? (
              <input
                type="text"
                placeholder={placeholder}
                className="text-black p-2 mt-5 w-9/12"
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-xl w-10/12 text-center">{title}</p>
            )}
            <div className="flex justify-center gap-10 w-2/3">
              {backButton && (
                <Button
                  onClick={backButton.action}
                  label={backButton.label}
                  className="text-lg font-normal w-36 bg-gray-700 text-nowrap"
                />
              )}
              {forwardButton && (
                <Button
                  onClick={forwardButton.action}
                  label={forwardButton.label}
                  className="bg-twd-primary-purple text-lg font-normal w-36 text-nowrap"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
