import { Avatar } from "@nextui-org/react";
import {
  Siren,
  Plant,
  MapPinLine,
  MapTrifold,
  UsersFour,
} from "@phosphor-icons/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const DetailsBar = () => {
  const [agePops, setAgePops] = useState([]);

  useEffect(() => {
    const getAgePops = async (taluka) => {
      try {
        const res = await axios.get("http://mehdb.vercel.app/agepops");
        const data = res.data;
        setAgePops(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        return "Error fetching data";
      }
    };

    getAgePops("Total").then((total) => {
      console.log(total);
    });
  }, []);
  const selectedTalukaData = agePops.find((item) => item.Taluka === "Total");
  const population = selectedTalukaData
    ? selectedTalukaData["Total"]
    : "Data not available";
  return (
    <div className="px-10 py-10 w-full justify-around flex flex-row flex-wrap">
      <div className="flex flex-col items-center my-4 mx-4">
        <Avatar
          className="w-20 h-20 my-2"
          isBordered
          color="default"
          fallback={<UsersFour size={40} color="#507dbc" weight="duotone" />}
        />
        <p className="text-center">
          <span className="font-bold">Population: </span>
          {population}
        </p>
      </div>
      <div className="flex flex-col items-center my-4 mx-4">
        <Avatar
          className="w-20 h-20 my-2"
          isBordered
          color="default"
          fallback={<MapTrifold size={40} color="#74c69d" weight="duotone" />}
        />
        <p className="text-center">
          <span className="font-bold">Area:</span> 4484.10 sq km
        </p>
      </div>
      <div className="flex flex-col items-center my-4 mx-4">
        <Avatar
          className="w-20 h-20 my-2"
          isBordered
          color="default"
          fallback={<Siren size={40} color="#ff0000" weight="duotone" />}
        />
        <p className="text-center">
          <span className="font-bold">Sub Divisions:</span> 4
        </p>
      </div>
      <div className="flex flex-col items-center my-4 mx-4">
        <Avatar
          className="w-20 h-20 my-2"
          isBordered
          color="default"
          fallback={<MapPinLine size={40} color="#219ebc" weight="duotone" />}
        />
        <p className="text-center">
          <span className="font-bold">Talukas:</span> 10
        </p>
      </div>
      <div className="flex flex-col items-center my-4 mx-4">
        <Avatar
          className="w-20 h-20 my-2"
          isBordered
          color="default"
          fallback={<Plant size={32} color="#008000" weight="duotone" />}
        />
        <p className="text-center">
          <span className="font-bold">Villages:</span> 614
        </p>
      </div>
    </div>
  );
};

export default DetailsBar;
