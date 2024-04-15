import React from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Trends from "./pages/Trends"
import Homepage from "./pages/Homepage"
import Map from "./pages/Map"
import Complex3 from "./pages/Complex3"

export default function App() {
  return(
    <>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/trends/3" element={<Complex3/>}/>
          <Route path="/trends" element={<Trends/>}/>
          <Route path="/map" element={<Map/>}/>
        </Routes>
      </div>
    </>
  )
}
