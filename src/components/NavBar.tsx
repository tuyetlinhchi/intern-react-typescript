import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div
      className="bg-blue-500 h-12 flex items-center space-x-11 text-white text-2xl font-bold
  "
    >
      <Link className="px-5" to="/">
        Home
      </Link>
      <Link to="/mentor">Mentor</Link>
      <Link to="/intern">Intern</Link>
    </div>
  );
};

export default NavBar;
