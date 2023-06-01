import { Route, Routes } from "react-router-dom";

import PostList from "../AdminPostList";
import AdminPostModification from "../PostModification/AdminPostModification";

const AdminPostRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/add" element={<AdminPostModification />} />
    </Routes>
  );
};

export default AdminPostRoutes;