import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export const TextEditor = () => {
  const { quill, quillRef } = useQuill();

  quill?.on("text-change", (delta) => {
    console.log(delta);
  });

  return (
    <div className="h-96 p-10">
      <div ref={quillRef} />
    </div>
  );
};
