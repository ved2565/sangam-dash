import React from "react";
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

export default function UploadCSV() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="min-w-[400px]">
        <CardHeader className="flex gap-3">
          <Logo/>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Task Submission</p>
        </CardBody>
        <Divider />
        <CardBody>
          {/* <p>Upload your CSV file here</p> */}
          <Input type="file" />
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            // isExternal
            // showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
