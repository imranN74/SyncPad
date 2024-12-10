import { useQuill } from "react-quilljs";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useCallback } from "react";
import { Connection } from "./Connection";
import { useRecoilState } from "recoil";
import { WsConnectionAtom } from "../store/webSocketAtoms/atom";
import { usefetchData } from "../hooks/fetchData";
import { useParams } from "react-router-dom";
import { useHandleContent } from "../hooks/handleContent";
import { debounce } from "lodash";
import { useSendMessage } from "../hooks/sendMessage";

export const TextEditor = () => {
  const { key } = useParams();

  const { quill, quillRef } = useQuill();
  const [socketConnection, setsocketConnection] =
    useRecoilState<null | WebSocket>(WsConnectionAtom);

  const debouncedHandleContent = useCallback(
    debounce(async (key: string, content: string) => {
      await useHandleContent(key, content);
    }, 1000),
    []
  );

  const debounceSendMessage = useCallback(() => {
    debounce((quill: Quill, socketConnection: WebSocket) => {
      useSendMessage(quill, socketConnection);
    }, 200);
  }, []);

  useEffect(() => {
    const socket = new WebSocket(
      `wss://syncpad-jlau.onrender.com?roomId=${key}`
    );
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
    debounceSendMessage();
  }, [quill, socketConnection]);
  // useEffect(() => {
  //   if (socketConnection) {
  //     socketConnection.onmessage = (event) => {
  //       const incomingMessage = event.data;
  //       if (quill && incomingMessage !== quill.root.innerHTML) {
  //         const currentRange = quill.getSelection();
  //         quill.clipboard.dangerouslyPasteHTML(incomingMessage);
  //         if (currentRange) {
  //           quill.setSelection(currentRange);
  //         }
  //       }
  //     };
  //   }
  // }, [quill, socketConnection]);

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
    return (
      <div className="flex justify-center mt-5">
        <Connection />
      </div>
    );
  }

  return (
    <div className="h-56 mx-3 md:h-80 md:mx-5 my-2">
      <div ref={quillRef} />
    </div>
  );
};
