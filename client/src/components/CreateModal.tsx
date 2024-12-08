import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

export const CreateModal: React.FC<{ visiblity: boolean }> = ({
  visiblity,
}) => {
  const navigate = useNavigate();

  const [keyValue, setKeyValue] = useState("");
  const randomStirng = nanoid(5);
  const randomPadId = randomStirng.slice(0, 6);

  function handleKeyChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setKeyValue(value);
  }

  return (
    <div
      className={`h-dvh w-dvw flex justify-center items-center modal z-50 ${
        visiblity ? "fixed inset-0 flex justify-center items-center" : "hidden"
      }`}
    >
      <div
        id="popup-modal"
        tabIndex={-1}
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          visiblity
            ? "fixed inset-0 flex justify-center items-center"
            : "hidden"
        }`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => {
                window.location.reload();
              }}
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="mx-10 py-5">
              <input
                type="text"
                value={keyValue}
                onChange={handleKeyChange}
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
              />
            </div>
            <div className="p-4 md:p-5 text-center flex flex-col gap-2">
              <button
                onClick={() => {
                  navigate(`/${keyValue}`);
                }}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Create
              </button>
              <button
                onClick={() => {
                  navigate(`/${randomPadId}`);
                }}
                data-modal-hide="popup-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                generate Pad
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
