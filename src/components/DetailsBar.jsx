import { Avatar } from "@nextui-org/react";
import {
  Buildings,
  HouseLine,
  MapPinLine,
  MapTrifold,
  UsersFour,
} from "@phosphor-icons/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const DetailsBar = () => {
  const [agePops, setAgePops] = useState([]);
  useEffect(() => {
    const getAgePops = async () => {
      const res = await axios.get("http://mehdb.vercel.app/agepops");
      setAgePops(res.data);
    }
    getAgePops();
  }, []);

  return (
    <div className="px-10 py-10 w-full justify-around flex flex-row flex-wrap">
      <div className="flex flex-col items-center">
        <Avatar
          className="w-24 h-24 my-2"
          isBordered
          color="default"
          fallback={<UsersFour size={40} />}
        />
        <p className="text-center">
          <span className="font-bold">Population:</span>{" "}
          {agePops.length > 0 ? agePops[7].Total : "Loading..."}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Avatar
          className="w-24 h-24 my-2"
          isBordered
          color="default"
          fallback={<MapTrifold size={40} />}
        />
        <p className="text-center">
          <span className="font-bold">Area:</span> 123456
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Avatar
          className="w-24 h-24 my-2"
          isBordered
          color="default"
          fallback={<Buildings size={40} />}
        />
        <p className="text-center">
          <span className="font-bold">Sub Divisions:</span> 123456
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Avatar
          className="w-24 h-24 my-2"
          isBordered
          color="default"
          fallback={<MapPinLine size={40} />}
        />
        <p className="text-center">
          <span className="font-bold">Talukas:</span> 123456
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Avatar
          className="w-24 h-24 my-2"
          isBordered
          color="default"
          fallback={<HouseLine size={40} />}
        />
        <p className="text-center">
          <span className="font-bold">Villages:</span> 123456
        </p>
      </div>
    </div>
  );
};

export default DetailsBar;
