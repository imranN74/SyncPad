import Quill from "quill";

export function useSendMessage(quill: Quill, socketConnection: WebSocket) {
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
}
