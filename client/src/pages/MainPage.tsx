import { TextEditor } from "../components/TextEditor";
import { Info } from "../components/Info";

export const MainPage = () => {
  return (
    <div className="w-full">
      <Info />
      <TextEditor />
    </div>
  );
};
