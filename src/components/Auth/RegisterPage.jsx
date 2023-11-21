import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
  Chip,
} from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo";
import { Toaster } from "react-hot-toast";
import {useSelector} from "react-redux";
import {selectAuthStatus, selectUserData} from "../../store/authSelectors"

const RegisterPage = () => {
  const authStatus = useSelector(selectAuthStatus);
  const userData = useSelector(selectUserData);
  const data = {
    username: userData.username,
    email: userData.email,
    role: "ADMIN",
  }

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: validateField(field, value) });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://mehdb.vercel.app/register",
        formData
      );

      if (response.status === 201) {
        toast.success("Registration successful!");
      } else if (response.status === 400) {
        toast.error(response.data.message);
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const validateField = (field, value) => {
    let regex;
    switch (field) {
      case "username":
        return value.trim() ? [] : ["Please enter your username."];
      case "email":
        // Email validation using regex
        regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value) ? [] : ["Please enter a valid email address."];
      case "password":
        regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/;
        if (!value.trim()) {
          return ["Please enter your password."];
        } else {
          let errors = [];
          if (!/(?=.*[a-z])/.test(value)) {
            errors.push("At least one lowercase letter. ");
          }
          if (!/(?=.*[A-Z])/.test(value)) {
            errors.push("At least one uppercase letter. ");
          }
          if (!/(?=.*\d)/.test(value)) {
            errors.push("At least one digit. ");
          }
          if (!/(?=.*[!@#$%^&*])/.test(value)) {
            errors.push("At least one special character (!@#$%^&*). ");
          }

          return errors;
        }
      case "role":
        return value.trim() ? [] : ["Please enter your role."];
      case "firstName":
        return value.trim() ? [] : ["Please enter your first name."];
      case "lastName":
        return value.trim() ? [] : ["Please enter your last name."];
      default:
        return [];
    }
  };

  return (authStatus && data.role === "ADMIN")?(
    <div className="flex justify-center items-center min-h-screen">
      <Toaster/>
      <Card className="w-96 p-4">
        <CardHeader className="text-center">
          <Logo />
        </CardHeader>
        <Divider />
        <CardBody>
          <form onSubmit={(e) => e.preventDefault()}>
            {Object.keys(formData).map((field) => (
              <div key={field} className="my-3">
                <Input
                  size="lg"
                  type={field === "email" ? "email" : "text"}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="my-2"
                  value={formData[field]}
                  onChange={(e) => handleInputChange(e, field)}
                  error={errors[field]}
                  variant="bordered"
                />
                {errors[field] && (
                  <div className="text-red-500">{errors[field]}</div>
                )}
              </div>
            ))}
            <Button
              type="button"
              onClick={handleRegister}
              className="btn-primary w-full mt-4"
              aria-label="Register"
            >
              Register
            </Button>
          </form>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="text-center">
            <span>Already have an account?</span>{" "}
            <span>
              <Chip>
                <NavLink to="/login" className="">
                  Login
                </NavLink>
              </Chip>
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  ):(
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-96">
        <CardHeader className="flex gap-3 justify-center">
          <h2>Register</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="text-red-500">
            <p>You are not authorized to view this page.</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
;
};

export default RegisterPage;
