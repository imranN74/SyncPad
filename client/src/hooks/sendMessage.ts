import Quill from "quill";
import { useCallback } from "react";
import { debounce } from "lodash";

export function useSendMessage(
  key: string,
  innerHtml: string,
  socketConnection: WebSocket | null
) {
  socketConnection?.send(JSON.stringify({ urlKey: key, message: innerHtml }));
}

export function useDebounceMessage(
  key: string,
  quill: Quill | undefined,
  socketConnection: WebSocket | null
) {
  const debounceSendMessage = useCallback(
    debounce((innerHtml: string) => {
      useSendMessage(key, innerHtml, socketConnection);
    }, 500),
    [quill, socketConnection]
  );
  return debounceSendMessage;
}
