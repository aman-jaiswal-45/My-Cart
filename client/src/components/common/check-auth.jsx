import { Navigate, useLocation } from "react-router-dom";


function CheckAuth({ isAuthenticated, user, children }) {     //Here children is child component of check_auth
  const location = useLocation();  //path nikalo URL se

  // console.log(location.pathname, isAuthenticated);

  //Check user has which type of authentication so that we can redirect them
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;    //Navigate mtlb udhr direct kro
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    } 
  }

  //Agar auth nahi hai aur login ya register kr rha h to use login page pr bhejo
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  //Auth hai aur loginregister pr jaa rha h to usko uske role ke hisaab se bhejo
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
    location.pathname.includes("/register")
    )
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  //admin na hokr admin pr jaane ka try kr rha h to use un_auth page pr bhejo
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  //admin hokr shop access kr rha h to admin-dashboard pr bhejo
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  //sab sahi chl rha to uske aage ke children pr jaane do
  return <>{children}</>;
}

export default CheckAuth;
