import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect } from "react";
import { Connection } from "../components/Connection";
import { useRecoilState } from "recoil";
import { WsConnectionAtom } from "../store/webSocketAtoms/atom";

export const TextEditor = () => {
  const { quill, quillRef } = useQuill();
  const [socketConnection, setsocketConnection] =
    useRecoilState<null | WebSocket>(WsConnectionAtom);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    socket.onopen = () => {
      console.log("connected");
      setsocketConnection(socket);
    };

    socket.onerror = (error) => {
      console.log(error);
    };
  }, []);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.onmessage = (event) => {
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
  }, [quill, socketConnection]);

  useEffect(() => {
    if (quill && socketConnection) {
      console.log(socketConnection);
      quill.on("text-change", (_, __, source) => {
        if (source === "user") {
          const innerHtml = quill.root.innerHTML;
          socketConnection.send(JSON.stringify({ message: innerHtml }));
        }
      });
    }
  }, [quill, socketConnection]);

  if (!socketConnection) {
    return <Connection />;
  }

  return (
    <div className="h-96 p-10">
      <div ref={quillRef} />
    </div>
  );
};
