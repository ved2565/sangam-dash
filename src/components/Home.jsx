import React from "react";
import Lenis from "@studio-freight/lenis";
import { Avatar } from "@nextui-org/react";
import { UsersFour } from "@phosphor-icons/react";
import ImageGallery from "./ImageGallery";

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
      <ImageGallery />
      <div className="px-10 py-10 w-full justify-around flex flex-row">
        <Avatar
          isBordered
          color="default"
          fallback={<UsersFour width={28} height={28} />}
        />
        <Avatar
          isBordered
          color="default"
          fallback={<UsersFour width={28} height={28} />}
        />
        <Avatar
          isBordered
          color="default"
          fallback={<UsersFour width={28} height={28} />}
        />
        <Avatar
          isBordered
          color="default"
          fallback={<UsersFour width={28} height={28} />}
        />
        <Avatar
          isBordered
          color="default"
          fallback={<UsersFour width={28} height={28} />}
        />
      </div>
    </div>
  );
};

export default Home;
