import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { EyeSlashFilledIcon } from "./icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "./icons/EyeFilledIcon";
import { useSelector } from "react-redux";
import { selectAuthStatus, selectUserData } from "../store/authSelectors";

export default function UserProfile() {
  const userData = useSelector(selectUserData);
  const authStatus = useSelector(selectAuthStatus);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((v) => !v);

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <h2 className="text-2xl font-bold">User Profile</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="First Name"
                defaultValue={userData.fname}
                className="mb-4"
                variant="bordered"
              />
              <Input
                label="Last Name"
                defaultValue={userData.lname}
                className="mb-4"
                variant="bordered"
              />
              <Input
                label="Username"
                defaultValue={userData.username}
                className="mb-4"
                variant="bordered"
              />
              <Input
                label="Password"
                variant="bordered"
                type={isVisible ? "text" : "password"}
                endContent={
                  <Button
                    variant="ghost"
                    onClick={toggleVisibility}
                    icon={
                      isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />
                    }
                  />
                }
                className="mb-4"
              />
            </div>
            <div>
              <Input
                label="Email"
                type="email"
                defaultValue={userData.email}
                className="mb-4"
                variant="bordered"
              />
              <Input
                label="Role"
                defaultValue={userData.role}
                className="mb-4"
                variant="bordered"
              />
            </div>
          </div>
          <div className="mt-6">
            <Button variant="success">Save Changes</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
