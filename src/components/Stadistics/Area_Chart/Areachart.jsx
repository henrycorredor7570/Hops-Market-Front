import React, { useContext, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { TotalUsersStadistics } from "../../Admin/AdminProfile";
import "./AreaChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "",
    },
  },
};

const labels = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function AreaChart() {
  const [area, setArea] = useState();
  useEffect(() => {
    const getInfoChart = async () => {
      try {
        const {data} = await axios.get(
          "https://hoppassion-server.1.ie-1.fl0.io/stadistics/monthlyIncomeForTheYear?type=amount"
        );
        console.log("peticion areachart:", data);
        setArea(data);
      } catch (error) {
        throw error
      }
    }
    getInfoChart();
  },[])
 console.log("areaChart:", area);
  const data = {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: "Cantidad de ventas",
        data: area?.data,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
}

export default AreaChart;
