// RegisterPage.js
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
} from "@nextui-org/react";
import axios from "axios";

const AddSchemes = () => {
  const [schemename, setSchemeName] = useState("");
  const [ministry, setMinistry] = useState("");
  const [desc, setDesc] = useState("");
  const [place, setPlace] = useState("");
  const [message, setMessage] = useState("");

  const handleAddScheme = async () => {
    try {
      const response = await axios.post("https://mehdb.vercel.app/addScheme", {
        schemename,
        ministry,
        desc,
        place,
      });

      if (response.status === 201) {
        setMessage("Scheme added successfully!");
      } else if (response.status === 401) {
        setMessage("Adding failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(`Internal server error: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-96 border border-black ">
        <CardHeader className="flex gap-3">
          <div className="text-xl font-bold">Add Scheme</div>
        </CardHeader>
        <Divider />
        <CardBody>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              size="lg"
              type="text"
              label="Scheme Name"
              className="my-2"
              value={schemename}
              onChange={(e) => setSchemeName(e.target.value)}
            />
            <Input
              size="lg"
              type="text"
              label="Ministry"
              className="my-2"
              value={ministry}
              onChange={(e) => setMinistry(e.target.value)}
            />
            <Input
              size="lg"
              type="text"
              label="Description"
              className="my-2"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <Input
              size="lg"
              type="text"
              label="Place"
              className="my-2"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddScheme}
              className="btn-primary"
              aria-label="Register"
            >
              Add Scheme
            </button>
          </form>
        </CardBody>
        <Divider />
        <CardFooter>
          <div>{message && <p>{message}</p>}</div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddSchemes;
