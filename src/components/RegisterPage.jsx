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

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:6969/register", {
        username,
        email,
        password,
        role,
        firstName,
        lastName,
      });

      if (response.status === 201) {
        setMessage("Registration successful!");
      } else if (response.status === 401) {
        setMessage("Registration failed: invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(`Internal server error: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-96">
        <CardHeader className="flex gap-3">
          {/* Your logo or header content */}
        </CardHeader>
        <Divider />
        <CardBody>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              size="lg"
              type="text"
              label="Username"
              className="my-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              size="lg"
              type="email"
              label="Email"
              className="my-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              size="lg"
              type="password"
              label="Password"
              className="my-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              size="lg"
              type="text"
              label="Role"
              className="my-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <Input
              size="lg"
              type="text"
              label="First Name"
              className="my-2"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              size="lg"
              type="text"
              label="Last Name"
              className="my-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <button
              type="button"
              onClick={handleRegister}
              className="btn-primary"
              aria-label="Register"
            >
              Register
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

export default RegisterPage;
