import { useState } from "react";
import { classNames } from "./utils";
import Modal from "./Modal";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        click to open the modal
      </button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} className="h-1/3 w-[80%]">
          <div
            className={classNames(
              "h-full w-full",
              "flex flex-col items-center justify-evenly",
              "bg-white text-black",
              "rounded-lg",
              "p-4"
            )}
          >
            <span id="dialogTitle" className="text-lg">
              Hi, I&apos;m Modal.
            </span>
            <span id="dialogMessage" className="flex flex-col text-sm">
              <span>You can close me by clicking the background, or</span>
              <span>
                by clicking the default close button on the top-right corner, or
              </span>
              <span>
                by clicking the parent-provided custom close button below.
              </span>
            </span>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 rounded-lg bg-orange-400 p-3"
            >
              custom close button
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
