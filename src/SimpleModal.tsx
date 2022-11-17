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
        <Modal onClose={() => setIsModalOpen(false)} className="w-[80%] h-1/3">
          <div
            className={classNames(
              "w-full h-full",
              "flex flex-col justify-evenly items-center",
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
              className="mt-4 bg-orange-400 rounded-lg p-3"
            >
              custom close button
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
