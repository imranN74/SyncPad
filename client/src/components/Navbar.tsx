import { Logo } from "./Logo";
import { useHandleModal } from "../hooks/handleModal";
import { CreateModal } from "./CreateModal";

export const Navbar = () => {
  const { modalState, setModalState } = useHandleModal(false);

  return (
    <div className="flex justify-between px-5 md:px-10 py-5 border-b-2 bg-red-100">
      <Logo />
      <div>
        <ul className="flex gap-4 md:gap-7 font-semibold">
          <li
            onClick={() => {
              setModalState(true);
            }}
          >
            <a className="text-red-500 cursor-pointer hover:underline">New</a>
          </li>

          <li>
            <a className="cursor-pointer hover:underline">Contact Us</a>
          </li>
        </ul>
      </div>
      <CreateModal visiblity={modalState} />
    </div>
  );
};
