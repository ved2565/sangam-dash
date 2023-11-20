import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import Logo from "../assets/Logo";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:6969/login", {
        username: email,
        password,
      });

      if (response.status === 200) {
        // Dispatch the login action with user data
        dispatch(login({ userData: response.data }));
        setMessage("Login successful!");
        navigate("/")
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      const response = await axios.post("https://mehdb.vercel.app/login", {
        username: email,
        password,
      });
      console.error("Error:", error);
      if (response && response.status === 401) {
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
          <Logo/>
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
            <button
              type="button"
              onClick={handleLogin}
              className="btn-primary"
              aria-label="Login"
            >
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
