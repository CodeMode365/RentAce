import React from "react";

import { Line, Pie } from "react-chartjs-2";
import { ArcElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Profile Result",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Visitors",
      data: labels.map(() => Math.random() * 1000),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Followers",
      data: labels.map(() => Math.random() * 1000),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const PieCharData = {
  labels: [
    "Daily Views",
    "Posted Spaces",
    "Profile visits",
    "Space Visit",
    "Positive Feedback",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 23],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const Charts = () => {
  return (
    <div className="w-full grid grid-cols-12 gap-4 p-2 my-4 px-6">
      <div className="col-span-8  shadow-lg  rounded-md">
        <Line options={options} data={data} className="w-full h-full" />
      </div>
      <div className="col-span-4 shadow-lg  rounded-md">
        <Pie
          data={PieCharData}
          className="w-full h-full transform-none animate-none"
        />
      </div>
    </div>
  );
};

export default Charts;
