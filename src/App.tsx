import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClubPage from "./pages/ClubPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClubPage />} />
        <Route path="/club/:slug" element={<ClubPage />} />
      </Routes>
    </BrowserRouter>
  );
}
