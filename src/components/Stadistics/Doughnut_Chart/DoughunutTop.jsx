import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./Doughnut.css";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

function TopProducts(){
    const [top, setTop] = useState();
    
    useEffect(() => {
        const getInfoChartt = async () => {
          // eslint-disable-next-line no-useless-catch
          try {
            const donutChartt = await axios.get(
              "https://hoppassion-server.1.ie-1.fl0.io/stadistics/getTenProduct"
            )
            setTop(donutChartt.data);
          } catch (error) {
            throw error
          }
        }
        getInfoChartt();
      },[])
      console.log(top)

      const doughnutOptions = {
        cutout: 100,
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
            label: "# unidades vendidas",
            data: top?.totalAmount,
            backgroundColor: ["rgba(236, 112, 99 )", "rgba(88, 214, 141)","rgb(58, 189, 224)", "rgb(202, 120, 232)","rgb(247, 247, 99)" ,"rgb(249, 165, 100)","rgb(141, 232, 217)",  "rgb(146, 141, 232)" ,"rgb(232, 132, 178)","rgb(234, 203, 145)"],
            borderColor: ["rgba(236, 112, 99 )", "rgba(88, 214, 141)","rgb(58, 189, 224)", "rgb(202, 120, 232)","rgb(247, 247, 99)", "rgb(249, 165, 100)","rgb(141, 232, 217)",  "rgb(146, 141, 232)" ,"rgb(232, 132, 178)", "rgb(234, 203, 145)"],
            borderWidth: 1,
          },
        ],
      };
      const colores=["rgba(236, 112, 99 )", "rgba(88, 214, 141)","rgb(58, 189, 224)", "rgb(202, 120, 232)","rgb(247, 247, 99)" ,"rgb(249, 165, 100)","rgb(141, 232, 217)",  "rgb(146, 141, 232)" ,"rgb(232, 132, 178)","rgb(234, 203, 145)"]
    return(

        <div>
          <h2 className="vendidos">Productos más vendidos</h2>
          <div className="principal">
            <div className="labels">{top?.labels.map((e,i)=>(
              <h3 key={i}>{e}</h3>
            ))}</div>
            <div >{colores?.map((e,i)=>(
              <div className="colores"key={i} style={{backgroundColor:e,height:"15px",width:"20px"}}></div>
            ))}</div>
            <div className="donita"><Doughnut data={data} options={doughnutOptions} /></div>
            
        </div>
        </div>
    )

}
export default TopProducts;