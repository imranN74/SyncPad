import { toast } from "react-toastify";

export const CopyUrl = () => {
  const currUrl = window.location.href;

  function handleCopyClick() {
    navigator.clipboard.writeText(currUrl).then(() => {
      toast.info("Copied");
    });
  }

  return (
    <div>
      <button
        onClick={() => {
          handleCopyClick();
        }}
        className="shadow-[0_0_0_3px_#000000_inset] px-3 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-semibold transform hover:-translate-y-1 transition duration-400"
      >
        Copy URL
      </button>
    </div>
  );
};
