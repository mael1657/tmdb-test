import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Favorite from "../pages/Favorite";
import Search from "../pages/Search";

const router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};

export default router;
