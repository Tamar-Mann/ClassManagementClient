// layout/NavBar.tsx
import { useAppSelector } from "../redux/hooks";
import { RoleType } from "../types/Enums/roleEnum.types";
import logo from "../assets/logoClass.png";
import StudentNav from "../components/StudentNav";
import TeacherNav from "../components/TeacherNavItem.tsx/TeacherNav";
import "./css/NavBar.css";

const NavBar = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <img src={logo} alt="Hi(gh) Class Logo" className="logo-img" />
      </div>
      <div className="nav-links">
        {user && user.role === RoleType.Admin && <TeacherNav />}
        {(user?.role === RoleType.User || user?.role === RoleType.AuthorizedUser) && <StudentNav />}
        {user?.role === RoleType.Master && (
          <>
            <TeacherNav />
            <StudentNav />
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
