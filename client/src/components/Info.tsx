import { useParams } from "react-router-dom";
import { CopyUrl } from "./CopyUrl";

export const Info = () => {
  const { key } = useParams();

  return (
    <div className="flex gap-3 justify-around items-center">
      <div className="flex gap-3 justify-around">
        <div className="font-normal">SyncPad ID :</div>
        <div className="font-bold">{key}</div>
      </div>
      <div>
        <CopyUrl />
      </div>
    </div>
  );
};
