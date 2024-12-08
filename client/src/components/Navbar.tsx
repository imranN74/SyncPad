import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <div className="flex justify-between px-5 md:px-10 py-5 border-b-2 bg-red-100">
      <Logo />
      <div>
        <ul className="flex gap-7 font-semibold">
          <li>
            <a className="text-red-500 cursor-pointer hover:underline">New</a>
          </li>
          <li>
            <a className="cursor-pointer hover:underline">About Us</a>
          </li>
          <li>
            <a className="cursor-pointer hover:underline">Contact Us</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
