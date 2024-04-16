import React from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Trends from "./pages/Trends"
import Homepage from "./pages/Homepage"
import Map from "./pages/Map"
import Complex1 from "./pages/Complex1";
import Complex2 from "./pages/Complex2";

export default function App() {
  return(
    <>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/trends" element={<Trends/>}/>
          <Route path="/trends/1" element={<Complex1/>}/>
          <Route path="/trends/2" element={<Complex2/>} />
          <Route path="/map" element={<Map/>}/>
        </Routes>
      </div>
    </>
  )
}
