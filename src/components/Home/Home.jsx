import Lenis from "@studio-freight/lenis";
// import ImageGallery from "./ImageGallery";
import DetailsBar from "./DetailsBar";
import Schemes from "../Schemes/Schemes";

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
    <div className="">
      {/* <ImageGallery /> */}
      <div className="main-data">
        <DetailsBar />
        <div className="flex justify-between gap-2">
          <div className="w-full">
            <Schemes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
