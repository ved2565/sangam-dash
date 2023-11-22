import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Temp1 = () => {
  const navigate = useNavigate();
  const callTemp = async () => {
    try {
      const res = await axios.get("https://mehdb.vercel.app/temp", {
        withCredentials: true,
      });
      console.log(res.data);

      if (res.status !== 200) {
        navigate("/login");
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      navigate("/login");
      console.log(err);
    }
  };

  useEffect(() => {
    callTemp();
  }, []);
  return (
    <>
      <h1>Temp1</h1>
      <div>Username: </div>
    </>
  );
};

export default Temp1;
