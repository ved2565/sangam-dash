import { useState } from "react";
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
import Logo from "../assets/Logo";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
// Import toast from react-hot-toast
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://mehdb.vercel.app/login", {
        username: email,
        password,
      });

      if (response.status === 200) {
        // Dispatch the login action with user data
        dispatch(login({ userData: response.data }));
        // Show success toast
        toast.success("Login successful");
        navigate("/");
      } else {
        // Show error toast
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 401) {
        // Show error toast for invalid credentials
        toast.error("Invalid credentials");
      } else {
        // Show error toast for other errors
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-96">
        <CardHeader className="flex items-center justify-center gap-3">
          <Logo />
          <h2 className="text-xl font-bold">Login</h2>
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
            <Button
              type="button"
              onClick={handleLogin}
              className="btn-primary my-4"
              aria-label="Login"
            >
              Login
            </Button>
          </form>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className={message ? "text-green-500" : "text-red-500"}>
            {message && <p>{message}</p>}
          </div>
        </CardFooter>
        {/* Add the Toaster component at the end of the card */}
        <Toaster position="top-center" reverseOrder={false} />
      </Card>
    </div>
  );
};

export default LoginPage;
