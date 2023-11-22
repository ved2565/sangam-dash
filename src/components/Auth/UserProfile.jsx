import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Divider, Input } from "@nextui-org/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  const [data, setData] = useState(null); // Initialize state with null or an appropriate default value
  useEffect(() => {
    const callTemp = async () => {
      try {
        const res = await axios.get("https://mehdb.vercel.app/temp", {
          // const res = await axios.get("http://localhost:6969/temp", {
          withCredentials: true,
        });

        console.log(res.data);

        if (res.status !== 200) {
          navigate("/login");
          const error = new Error(res.error);
          throw error;
        }

        setData(res.data); // Update state with the received data
        console.log("Data in state:", data); // Log the data in the state
      } catch (err) {
        navigate("/login");
        console.log(err);
      }
    };

    // Call the function when the component mounts
    callTemp();
  }, [navigate]);
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
              {/* {data && <div>Username: {data.user.firstName}</div>} */}
              {data && (
                <Input
                  label="First Name"
                  defaultValue={data.user.firstName}
                  className="mb-4"
                  variant="bordered"
                  readOnly
                />
              )}
              {data && (
                <Input
                  label="Last Name"
                  defaultValue={data.user.lastName}
                  className="mb-4"
                  variant="bordered"
                />
              )}
              {data && (
                <Input
                  label="Username"
                  defaultValue={data.user.username}
                  className="mb-4"
                  variant="bordered"
                />
              )}
            </div>
            <div>
              {data && (
                <Input
                  label="Email"
                  type="email"
                  defaultValue={data.user.email}
                  className="mb-4"
                  variant="bordered"
                />
              )}
              {data && (
                <Input
                  label="Role"
                  defaultValue={data.user.role}
                  className="mb-4"
                  variant="bordered"
                />
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
