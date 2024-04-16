import React from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Trends from "./pages/Trends"
import Homepage from "./pages/Homepage"
import Map from "./pages/Map"
import Complex5 from "./pages/Complex5"
import Complex3 from "./pages/Complex3"
import Complex1 from "./pages/Complex1";

export default function App() {
  return(
    <>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/trends" element={<Trends/>}/>
          <Route path="/trends/1" element={<Complex1/>}/>
          <Route path="/trends/3" element={<Complex3/>}/>
          <Route path="/trends/5" element={<Complex5/>}/>
          <Route path="/map" element={<Map/>}/>
        </Routes>
      </div>
    </>
  )
}
