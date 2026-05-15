import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { TrackerPage } from "@/pages/TrackerPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
