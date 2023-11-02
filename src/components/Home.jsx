import React from "react";
import Lenis from "@studio-freight/lenis";
import ImageGallery from "./ImageGallery";
import DetailsBar from "./DetailsBar";

const lenis = new Lenis();

lenis.on("scroll", (e) => {
  // console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const Home = () => {
  // const [agePops, setAgePops] = useState([]);
  // useEffect(() => {
  //   const getAgePops = async () => {
  //     const res = await axios.get("http://localhost:5000/agepops");
  //     setAgePops(res.data);
  //   }
  //   getAgePops();
  // }, []);

  return (
    <div className="App">
      <ImageGallery />
      <DetailsBar/>
      
    </div>
  );
};

export default Home;
