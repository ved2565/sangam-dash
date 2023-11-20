import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
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
  const [validationErrors, setValidationErrors] = useState({});

  const validateUsername = () => {
    if (!username.trim()) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username is required",
      }));
    } else if (username.length < 3) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username must be at least 3 characters long",
      }));
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        username: null,
      }));
    }
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: null,
      }));
    }
  };

  const validatePassword = () => {
    if (!password.trim()) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}/.test(
        password
      )
    ) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must have at least one lowercase letter, one uppercase letter, one numeral, one symbol, and be 8-20 characters long",
      }));
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: null,
      }));
    }
  };

  const validateRole = () => {
    if (!role.trim()) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        role: "Role is required",
      }));
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        role: null,
      }));
    }
  };

  const validateFirstName = () => {
    if (!firstName.trim()) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "First Name is required",
      }));
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        firstName: null,
      }));
    }
  };

  const validateLastName = () => {
    if (!lastName.trim()) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        lastName: "Last Name is required",
      }));
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        lastName: null,
      }));
    }
  };

  const handleRegister = async () => {
    if (
      Object.values(validationErrors).every((error) => !error) &&
      username &&
      email &&
      password &&
      role &&
      firstName &&
      lastName
    ) {
      try {
        const response = await axios.post("https://mehdb.vercel.app/register", {
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
    } else {
      setMessage("Please fill in all the required fields correctly.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-96">
        <CardHeader className="flex gap-3 justify-center">
          <h2>Register</h2>
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
              onBlur={validateUsername}
            />
            {validationErrors.username && (
              <p className="text-red-500">{validationErrors.username}</p>
            )}

            <Input
              size="lg"
              type="email"
              label="Email"
              className="my-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
            />
            {validationErrors.email && (
              <p className="text-red-500">{validationErrors.email}</p>
            )}

            <Input
              size="lg"
              type="password"
              label="Password"
              className="my-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
            />
            {validationErrors.password && (
              <p className="text-red-500">{validationErrors.password}</p>
            )}

            <Input
              size="lg"
              type="text"
              label="Role"
              className="my-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              onBlur={validateRole}
            />
            {validationErrors.role && (
              <p className="text-red-500">{validationErrors.role}</p>
            )}

            <Input
              size="lg"
              type="text"
              label="First Name"
              className="my-2"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={validateFirstName}
            />
            {validationErrors.firstName && (
              <p className="text-red-500">{validationErrors.firstName}</p>
            )}

            <Input
              size="lg"
              type="text"
              label="Last Name"
              className="my-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={validateLastName}
            />
            {validationErrors.lastName && (
              <p className="text-red-500">{validationErrors.lastName}</p>
            )}

            <Button
              type="button"
              onClick={handleRegister}
              className="btn-primary my-4"
              color={
                Object.values(validationErrors).every((error) => !error) &&
                username &&
                email &&
                password &&
                role &&
                firstName &&
                lastName
                  ? "success"
                  : "error"
              }
              aria-label="Register"
            >
              Register
            </Button>
          </form>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className={message ? "text-green-500" : "text-red-500"}>
            {message && <p>{message}</p>}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
