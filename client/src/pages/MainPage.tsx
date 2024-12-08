import { TextEditor } from "../components/TextEditor";
import { Info } from "../components/Info";

export const MainPage = () => {
  return (
    <div className="w-full bg-gradient-to-l from-orange-300 to-orange-100 py-1">
      <Info />
      <TextEditor />
    </div>
  );
};
