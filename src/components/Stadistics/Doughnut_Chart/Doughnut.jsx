import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./Doughnut.css";
import axios from "axios";
ChartJS.register(ArcElement, Tooltip, Legend);

function MyDoughnut() {
  const [donut, setDonut] = useState();

  useEffect(() => {
    const getInfoChart = async () => {
      try {
        const donutChart = await axios.get(
          "https://hoppassion-server.1.ie-1.fl0.io/stadistics/totalUsers"
        )
        setDonut(donutChart.data.data);
      } catch (error) {
        throw error
      }
    }
    getInfoChart();
  },[])
  
  console.log("donut", donut);
  const doughnutOptions = {
    cutout: 38,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 10, // Cambia el tamaño de las etiquetas aquí
          },
        },
      },
    }, // Controla el grosor del anillo (ajusta el valor según tus necesidades)
  };

  const data = {
    labels: [],
    datasets: [
      {
        label: "# de Usuarios",
        data: [donut?.desactive, donut?.active],
        backgroundColor: ["rgba(236, 112, 99 )", "rgba(88, 214, 141)"],
        borderColor: ["rgba(236, 112, 99 )", "rgba(88, 214, 141)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="containerStyle">
      <div className="containerFlex">
        <div className="userTotal">
          <img
            src="https://res.cloudinary.com/dkwvnp3ut/image/upload/v1697227013/user_zyjpeq.png"
            alt=""
          />
          <span>Usuarios totales</span>
          <span className="totalUsers">{donut?.totalUsers}</span>
        </div>
        <div className="dona">
          <Doughnut data={data} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
}

export default MyDoughnut;
