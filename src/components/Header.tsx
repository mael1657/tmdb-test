import { AppBar, Box } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const Header = () => {
  return (
    <AppBar
      sx={{
        flexGrow: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "40px",
        padding: "0 20px",
      }}
      component="nav"
    >
      <Box>
        <Link to="/">
          <HomeOutlinedIcon />
        </Link>
      </Box>
      <Box sx={{ display: "flex", gap: "8px" }}>
        <Link to="/search">검색</Link>
        <Link to="/favorite">좋아요</Link>
      </Box>
    </AppBar>
  );
};

export default Header;
