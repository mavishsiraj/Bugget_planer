import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./views/components/Navbar";
import Home from "./views/pages/Home";
import Income from "./views/pages/Income";
import Expenses from "./views/pages/Expenses";
import Summary from "./views/pages/Summary";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  );
}