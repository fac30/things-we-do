import Button from "@/ui/shared/Button";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

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

export default function NeedsModal({
  modalOpen,
  title,
  forwardButton,
  backButton,
  needsStep,
}: ModalProps) {
  return (
    <>
      {modalOpen && (
        <div className="h-96 w-11/12 absolute top-1/2 left-1/2 bg-gray-800 border-[1.5px] rounded-lg -translate-x-1/2 -translate-y-1/2">
          <ChevronLeftIcon className="h-10 w-10 absolute left-0 top-5" />
          <div className="flex flex-col w-full items-center py-10 justify-between h-full">
            <p className="text-xl w-10/12 text-center">{title}</p>
            <p className="text-md w-10/12 text-center">
              Select the button that best describes meeting this need right now.
            </p>

            <div className="flex justify-center gap-10 w-2/3">
              {backButton && (
                <Button
                  onClick={backButton.action}
                  label={backButton.label}
                  className="text-lg font-normal w-36 h-48 bg-twd-secondary-purple text-balance rounded-none"
                />
              )}
              {forwardButton && (
                <Button
                  onClick={forwardButton.action}
                  label={forwardButton.label}
                  className="bg-twd-primary-purple text-lg font-normal w-36 text-balance rounded-none"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
