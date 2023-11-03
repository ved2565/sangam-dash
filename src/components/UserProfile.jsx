import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import Logo from "../assets/Logo";
import { Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "./icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "./icons/EyeFilledIcon";

export default function UserProfile() {
  const data = {
    "First Name": "First ",
    "Last Name": "Last",
    Username: "@name",
    Email: "123@email.com",
    Role: "hod",
  };
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="flex justify-center">
      <Card className="min-w-[800px]">
        <CardHeader className="flex justify-around gap-3">
          <Logo />
          <div className="flex flex-col">
            <p className="text-md">First Last</p>
            <p className="text-small text-default-500">@username</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col justify-center">
            <Input
              isRequired
              type="text"
              label="First Name"
              defaultValue={data["First Name"]}
              className="max-w-xs m-2"
            />
            <Input
              isRequired
              type="text"
              label="Last Name"
              defaultValue={data["Last Name"]}
              className="max-w-xs m-2"
            />
            <Input
              isRequired
              type="text"
              label="Username"
              defaultValue={data["Username"]}
              className="max-w-xs m-2"
            />
            <Input
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-xs"
            />
            <Input
              isRequired
              type="email"
              label="Email"
              defaultValue={data["Email"]}
              className="max-w-xs m-2"
            />
            <Input
              isRequired
              type="text"
              label="Role"
              defaultValue={data["Role"]}
              className="max-w-xs m-2"
            />
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            Visit source code on GitHub.
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
