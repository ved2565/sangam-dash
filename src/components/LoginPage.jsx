import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Input } from "@nextui-org/react";
import Logo from "../assets/Logo";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username: email, // Assuming your server expects 'username' instead of 'email'
        password,
      });

      if (response.status === 200) {
        setMessage("Login successful!");
        // Redirect to another page or perform additional actions upon successful login
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      if ( response.status === 401 ) {
        setMessage("Login failed. Please check your credentials.");
      } else {
        setMessage(`Internal server error: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-96">
        <CardHeader className="flex gap-3">
          <Logo />
          {/* Additional header content if needed */}
        </CardHeader>
        <Divider />
        <CardBody>
          <form onSubmit={(e) => e.preventDefault()}>
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
            <button type="button" onClick={handleLogin} className="btn-primary" aria-label="Login">
              Login
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

export default LoginPage;
