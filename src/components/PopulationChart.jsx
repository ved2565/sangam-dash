import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import React, { useEffect, useState } from "react";

const PopulationChart = () => {
  const [agePops, setAgePops] = useState([]);
  useEffect(() => {
    const getAgePops = async () => {
      const res = await axios.get("http://mehdb.vercel.app/agepops");
      setAgePops(res.data);
    };
    getAgePops();
  }, []);
  const labels = agePops
    .map((agePop, index) =>
      agePops.length > 0 && index < 7 ? agePop.Taluka : "Loading..."
    )
    .slice(0, 7);
  const bata = {
    labels: labels,
    datasets: [
      {
        label: "Population",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [
          agePops.length > 0 ? agePops[0].Total : "Loading...",
          agePops.length > 0 ? agePops[1].Total : "Loading...",
          agePops.length > 0 ? agePops[2].Total : "Loading...",
          agePops.length > 0 ? agePops[3].Total : "Loading...",
          agePops.length > 0 ? agePops[4].Total : "Loading...",
          agePops.length > 0 ? agePops[5].Total : "Loading...",
          agePops.length > 0 ? agePops[6].Total : "Loading...",
        ],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        suggestedMax: 500000, // Set your upper limit for the y-axis here
        // You can also use 'max' instead of 'suggestedMax' in some versions of react-chartjs-2
        // max: 20,
        beginAtZero: true, // Whether to start the y-axis at zero or not
      },
    },
  };

  return (
    <div className="w-1/2">
      <Bar data={bata} options={options} />
    </div>
  );
};

export default PopulationChart;
