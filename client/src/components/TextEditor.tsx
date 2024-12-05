import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect, useCallback } from "react";
import { Connection } from "./Connection";
import { useRecoilState } from "recoil";
import { WsConnectionAtom } from "../store/webSocketAtoms/atom";
import { usefetchData } from "../hooks/fetchData";
import { useParams } from "react-router-dom";
import { useHandleContent } from "../hooks/handleContent";
import { debounce } from "lodash";

export const TextEditor = () => {
  const { key } = useParams();

  const { quill, quillRef } = useQuill();
  const [socketConnection, setsocketConnection] =
    useRecoilState<null | WebSocket>(WsConnectionAtom);

  const debouncedHandleContent = useCallback(
    debounce(async (key: string, content: string) => {
      await useHandleContent(key, content);
    }, 1000),
    [] // Empty dependencies ensure the function is created once
  );

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:3000?roomId=${key}`);
    socket.onopen = () => {
      console.log("connected");
      setsocketConnection(socket);
      const randomKey = "";
      usefetchData(key ?? randomKey).then((content) => {
        quill?.clipboard.dangerouslyPasteHTML(content);
      });
    };

    socket.onerror = (error) => {
      console.log(error);
    };
  }, [quill]);

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
      quill.on("text-change", (_, __, source) => {
        if (source === "user") {
          const innerHtml = quill.root.innerHTML;

          socketConnection.send(
            JSON.stringify({ urlKey: key, message: innerHtml })
          );
          debouncedHandleContent(key ?? "", innerHtml);
        }
      });
    }
  }, [quill, socketConnection]);

  if (!socketConnection) {
    return <Connection />;
  }

  return (
    <div className="h-96 mx-3 md:h-80 md:mx-10 my-2">
      <div ref={quillRef} />
    </div>
  );
};
