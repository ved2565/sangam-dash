import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Input
} from "@nextui-org/react";
import Logo from "../assets/Logo";
import Papa from "papaparse";
import axios from "axios";

export default function UploadCSV() {
  const [csvData, setCsvData] = useState(null);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleButtonClick = () => {
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          setCsvData(result.data);
        },
        skipEmptyLines: true,
      });
    }
  };

  const handleSubmit = async () => {
    if (!csvData) {
      setMessage("Please upload a CSV file first.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:6969/upload", {
        csvData: csvData,
      });


       

      if (response.status === 200) {
        setMessage("Upload successful!");
      } else {
        setMessage("Upload failed. Please check your request.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(`Upload failed. ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="min-w-[400px]">
        <CardHeader className="flex gap-3">
          <Logo />
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Task Submission</p>
        </CardBody>
        <Divider />
        <CardBody>
          <Input type="file" onChange={handleFileChange} />
          <label htmlFor="fileInput">
            <Button component="span" onClick={handleButtonClick}>
              Upload CSV
            </Button>
          </label>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </CardFooter>
      </Card>
      {csvData && (
        <div>
          <h2>CSV Data in JSON format:</h2>
          <pre>{JSON.stringify(csvData, null, 2)}</pre>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}
