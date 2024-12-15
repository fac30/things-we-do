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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="w-11/12 max-w-lg bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-lg">
            <div className="flex flex-col items-center">
              {inputModal ? (
                <input
                  type="text"
                  placeholder={placeholder}
                  className="w-9/12 px-3 py-2 mt-4 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-twd-primary-purple addToolInput"
                  onChange={handleInputChange}
                />
              ) : (
                <p className="mt-4 text-xl text-center text-white">{title}</p>
              )}
              <div className="flex justify-center gap-4 mt-6 w-full">
                {backButton && (
                  <Button
                    onClick={backButton.action}
                    label={backButton.label}
                    className="px-4 py-2 text-lg font-medium text-white bg-gray-600 rounded-full hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 w-36 text-nowrap"
                  />
                )}
                {forwardButton && (
                  <Button
                    onClick={forwardButton.action}
                    label={forwardButton.label}
                    className="px-4 py-2 text-lg font-medium text-white bg-twd-primary-purple rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 w-36 text-nowrap"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
