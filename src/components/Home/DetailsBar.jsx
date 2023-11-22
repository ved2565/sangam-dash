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
import {
  Card,
  CardFooter,
  CardHeader,
  Divider,
  CardBody,
  Link,
} from "@nextui-org/react";

const DetailsBar = () => {
  const [agePops, setAgePops] = useState([]);

  useEffect(() => {
    const getAgePops = async (taluka) => {
      try {
        const res = await axios.get("https://mehdb.vercel.app/agepops");
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
    <div className="w-full justify-between flex flex-row flex-wrap bg-slate- rounded-lg">
      <div className="flex flex-col items-center my-4">
        <Card className="border border-black">
          <CardBody className="min-w-[260px] ">
            <div className="flex justify-start items-center gap-5 ">
            <div className="flex justify-center my-2">
              <Avatar
                className="w-12 h-12 bg-white"
                isBordered
                color="default"
                fallback={
                  <UsersFour size={22} color="#74c69d" weight="duotone" />
                }
              />
            </div>
            <div className="flex flex-col ">
              <p className=" text-2xl font-mono ">{population}</p>
              <span className="text-sm">Total Population</span>
            </div>
          </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-col items-center my-4  ">
      <Card className="border border-black">
          <CardBody className="min-w-[260px] ">
            <div className="flex justify-start items-center gap-5 ">
            <div className="flex justify-center my-2">
              <Avatar
                className="w-12 h-12 bg-white"
                isBordered
                color="default"
                fallback={
                  <MapTrifold size={22} color="#74c69d" weight="duotone" />
                }
              />
            </div>
            <div className="flex flex-col ">
              <p className=" text-2xl font-mono ">4484.10<span className="text-sm">sq km</span></p>
              <span className="text-sm">Area</span>
            </div>
          </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-col items-center my-4 ">
      <Card className="border border-black">
          <CardBody className="min-w-[260px] ">
            <div className="flex justify-start items-center gap-5 ">
            <div className="flex justify-center my-2">
              <Avatar
                className="w-12 h-12 bg-white"
                isBordered
                color="default"
                fallback={
                  <Siren size={22} color="#74c69d" weight="duotone" />
                }
              />
            </div>
            <div className="flex flex-col ">
              <p className=" text-2xl font-mono ">4</p>
              <span className="text-sm">Sub Divison</span>
            </div>
          </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-col items-center my-4 ">
      <Card className="border border-black">
          <CardBody className="min-w-[260px] ">
            <div className="flex justify-start items-center gap-5 ">
            <div className="flex justify-center my-2">
              <Avatar
                className="w-12 h-12 bg-white"
                isBordered
                color="default"
                fallback={
                  <MapPinLine size={22} color="#74c69d" weight="duotone" />
                }
              />
            </div>
            <div className="flex flex-col ">
              <p className=" text-2xl font-mono ">10</p>
              <span className="text-sm">Talukas</span>
            </div>
          </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-col items-center my-4 ">
      <Card className="border border-black">
          <CardBody className="min-w-[260px] ">
            <div className="flex justify-start items-center gap-5 ">
            <div className="flex justify-center my-2">
              <Avatar
                className="w-12 h-12 bg-white"
                isBordered
                color="default"
                fallback={
                  <Plant size={22} color="#74c69d" weight="duotone" />
                }
              />
            </div>
            <div className="flex flex-col ">
              <p className=" text-2xl font-mono ">614</p>
              <span className="text-sm">Villages</span>
            </div>
          </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DetailsBar;
