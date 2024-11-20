import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useEffect } from "react";

const socket = io("http://localhost:3000");

export const TextEditor = () => {
  const { quill, quillRef } = useQuill();

  quill?.on("text-change", (delta, oldDelta, source) => {
    if (source === "user") {
      socket.emit("content", { delta });
    }
  });

  useEffect(() => {
    socket.on("recieve_content", (data) => {
      quill?.updateContents(data.delta);
    });
  }, [quill]);

  return (
    <div className="h-96 p-10">
      <div ref={quillRef} />
    </div>
  );
};
