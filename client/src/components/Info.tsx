import { useParams } from "react-router-dom";

export const Info = () => {
  const { key } = useParams();

  return (
    <div className="flex gap-3 justify-center">
      <div className="font-normal">Your Room ID :</div>
      <div className="font-bold">{key}</div>
    </div>
  );
};
