import './index.css';
import Canvas from './flow/core/Canvas'
import Tester from "@/dexietest/tester"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./nav/navbar";

export default function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<div/>} />
            <Route path="flow" element={<Canvas />} />
            <Route path="tester" element={<Tester />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </div>
  );
}

