import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClubPage from "./pages/ClubPage";
import AthletePage from "./pages/AthletePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClubPage />} />
        <Route path="/club/:slug" element={<ClubPage />} />
        <Route path="/athlete/:id" element={<AthletePage />} />
      </Routes>
    </BrowserRouter>
  );
}
