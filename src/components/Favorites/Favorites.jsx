import style from "./Favorites.module.css";
import Card from "../Card/Card";

export default function Favorites(props) {
  // const { favorites } = props;
  const favorites = [
    {
      id:11,
      name:"Hoppa Hontas",
      price:22.5,
      image:"https://belgiancraftbeers.com/wp-content/uploads/2020/03/Maenhout-Hoppa-Hontas-v2.jpg.webp",
      stock:13
    },
    {
      id:19,
      name:"El gato Houblon",
      price:14,
      image:"https://belgiancraftbeers.com/wp-content/uploads/2020/05/De-Poes-Houblon.png",
      stock:22
    },
    {
      id:23,
      name:"Éxtasis IPA",
      price:28,
      image:"https://belgiancraftbeers.com/wp-content/uploads/2020/03/Extase.png.webp",
      stock:10
    },
  ]
  return (
    <div className={style.container}>
      {favorites?.map((e, i) => (
        <Card key={i} id={e.id} name={e.name} price={e.price} image={e.image} stock={e.stock} />
      ))}
    </div>
  );
}
