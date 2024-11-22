import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";

export const TextEditor = () => {
  const { quill, quillRef } = useQuill();
  // const isUpdatedProg = useRef(false);

  quill?.on("text-change", (delta, oldDelta, source) => {
    console.log(delta);
  });

  useEffect(() => {}, [quill]);

  return (
    <div className="h-96 p-10">
      <div ref={quillRef} />
    </div>
  );
};
