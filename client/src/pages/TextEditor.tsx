import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Connection } from "../components/Connection";

export const TextEditor = () => {
  const { quill, quillRef } = useQuill();
  const [socketCon, setSocketCon] = useState<null | WebSocket>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    socket.onopen = () => {
      console.log("connected");
      setSocketCon(socket);
    };

    socket.onerror = (error) => {
      console.log(error);
    };
  }, []);

  useEffect(() => {
    if (socketCon) {
      socketCon.onmessage = (event) => {
        const incomingMessage = event.data;
        if (quill && incomingMessage !== quill.root.innerHTML) {
          const currentRange = quill.getSelection();
          quill.clipboard.dangerouslyPasteHTML(incomingMessage);
          if (currentRange) {
            quill.setSelection(currentRange);
          }
        }
      };
    }
  }, [quill, socketCon]);

  useEffect(() => {
    if (quill && socketCon) {
      console.log(socketCon);
      quill.on("text-change", (_, __, source) => {
        if (source === "user") {
          const innerHtml = quill.root.innerHTML;
          socketCon.send(innerHtml);
        }
      });
    }
  }, [quill, socketCon]);

  if (!socketCon) {
    <Connection />;
  }

  return (
    <div className="h-96 p-10">
      <div ref={quillRef} />
    </div>
  );
};
