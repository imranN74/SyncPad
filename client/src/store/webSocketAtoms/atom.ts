import { atom } from "recoil";

export const WsConnectionAtom = atom<WebSocket | null>({
  key: "WsConnectionAtom",
  default: null,
});
