import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <div className="flex justify-between px-5 md:px-10 py-5 border-b-2 bg-red-100">
      <Logo />
      <div>
        <ul className="flex gap-5">
          <li>
            <a>Create Room</a>
          </li>
          <li>
            <a>About Us</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
