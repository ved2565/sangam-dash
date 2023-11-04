import React from "react";
import Lenis from "@studio-freight/lenis";
// import ImageGallery from "./ImageGallery";
import DetailsBar from "./DetailsBar";
import PopulationChart from "./PopulationChart";
import Schemes from "./Schemes";

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
    <div className="mx-4">
      {/* <ImageGallery /> */}
      <DetailsBar />
      <div className="flex justify-between gap-2">
        <div className="w-1/3 mx-4">
          <PopulationChart />
        </div>
        <div className="w-full mx-4">
          <Schemes />
        </div>
      </div>
    </div>
  );
};

export default Home;
