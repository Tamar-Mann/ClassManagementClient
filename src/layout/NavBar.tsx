import { useAppSelector } from "../redux/hooks";
import { RoleType } from "../types/Enums/roleEnum.types";
import logo from "../assets/logoClass.png";
import StudentNav from "./StudentNav";
import TeacherNav from "./TeacherNav";
import "./css/NavBar.css";

const NavBar = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <nav className="navbar">
      <div className="logo-area">
        <img src={logo} alt="Hi(gh) Class Logo" className="logo-img" />
      </div>

      {user && (
        <div className="nav-links">
          {user.role === RoleType.Admin && <TeacherNav />}
          {(user.role === RoleType.User || user.role === RoleType.AuthorizedUser) && (
            <StudentNav />
          )}
          {user.role === RoleType.Master && (
            <>
              <TeacherNav />
              <StudentNav />
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;



// import { useAppSelector } from "../redux/hooks";
// import { RoleType } from "../types/Enums/roleEnum.types";
// import logo from "../assets/logoClass.png";
// import StudentNav from "./StudentNav";
// import TeacherNav from "./TeacherNav";

// const NavBar = () => {
//   const user = useAppSelector((state) => state.auth.user);

//   if (!user) return null;

//   switch (user.role) {
//     case RoleType.Admin:
//       return <TeacherNav />;
//     case RoleType.User:
//     case RoleType.AuthorizedUser:
//       return <StudentNav />;
//     case RoleType.Master:
//       return (
//         <>
//           <TeacherNav />
//           <StudentNav />
//         </>
//       );
//     default:
//       return null;
//   }
// };

// export default NavBar;
