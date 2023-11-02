import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import React, { useEffect, useState } from "react";

const PopulationChart = () => {
  const [agePops, setAgePops] = useState([]);

  useEffect(() => {
    const getAgePops = async () => {
      const res = await axios.get("http://mehdb.vercel.app/agepops");
      const sortedData = res.data.sort((a, b) => a.Sr.No - b.Sr.No); // Sorting the data by Sr.No
      setAgePops(sortedData);
    };
    getAgePops();
  }, []);

  const labels = agePops
    .map((agePop, index) =>
      agePops.length > 0 && index < 7 ? agePop.Taluka : "Loading..."
    )
    .slice(0, 7);

  const data = agePops
    .map((agePop, index) =>
      agePops.length > 0 && index < 7 ? agePop.Total : "Loading..."
    )
    .slice(0, 7);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Population",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: data,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        suggestedMax: 500000,
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} style={{ height: '300px', width: '100%' }} />
    </div>
  );
};

export default PopulationChart;
