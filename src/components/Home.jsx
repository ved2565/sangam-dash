import React from "react";
import Lenis from "@studio-freight/lenis";
import { Link } from "react-router-dom";

const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const Home = () => {
  return (
    <div className="App">
      <div className="section1 min-h-screen bg-slate-300">
        <Link to="/about">second</Link>
      </div>
      <div className="section2 min-h-screen bg-slate-600">Section 2</div>
      <div className="section3 min-h-screen bg-slate-900">Section 3</div>
    </div>
  );
};

export default Home;
