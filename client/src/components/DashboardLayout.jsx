import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setUser } from "../features/user/userSlice";

export default function DashboardLayout() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(setUser(null));
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <AppBar position="absolute">
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <Typography>Welcome, {user?.user?.firstName}</Typography>
          &nbsp;&nbsp;&nbsp;
          <Button
            onClick={handleLogout}
            variant="contained"
            style={{ backgroundColor: "red" }}
          >
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}
