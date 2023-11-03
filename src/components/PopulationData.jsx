import React, { useState, useEffect } from "react";
import axios from "axios";

const PopulationData = () => {
  const [agePops, setAgePops] = useState([]);

  useEffect(() => {
    const getAgePops = async () => {
      const res = await axios.get("https://mehdb.vercel.app/agepops");
      const sortedData = res.data.sort((a, b) => a.Sr.No - b.Sr.No); // Sorting the data by Sr.No
      setAgePops(sortedData);
    };
    getAgePops();
  }, []);

  const labels = agePops.map((agePop, index) =>
    agePops.length > 0 && index < 7 ? agePop.Taluka : "Loading..."
  ).slice(0, 7);

  const data = agePops.map((agePop, index) =>
    agePops.length > 0 && index < 7 ? agePop.Total : "Loading..."
  ).slice(0, 7);

  return (
    <div className="flex" style={{ fontSize: '16px' }}>
      <ul>
        {labels.map((label, index) => (
          <li className="font-bold" key={index}>
            {label}:
          </li>
        ))}
      </ul>
      <ul>
        {data.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopulationData;
