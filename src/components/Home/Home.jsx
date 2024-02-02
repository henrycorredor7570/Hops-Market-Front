import "./Home.module.css";
import Navbar from "../Navbar/Navbar";
import CardContainer from "../CardContainer/CardContainer";
import Footer from "../Footer/Footer";
import Filters from "../Filters/Filters";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import Favorites from "../Favorites/Favorites";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import logotype from "../../assets/logo_brand.png";
import Carousel from "react-bootstrap/Carousel";
import { Link, useNavigate } from "react-router-dom";
import style from "./Home.module.css";
import { getLoggedInUser } from "../../utils/UserUtils";
import HopPassionClient from "../../utils/NetworkingUtils";

const Home = () => {
  const navigate = useNavigate();
  const refAllProducts = useRef(null);
  const refFeaturedProducts = useRef(null);
  const user = getLoggedInUser();
  const [favorites, setFavorites] = useState([]);

  const handleNavigate = () => {
    navigate("/signup");
  };

  const handleScrollToAllProducts = () => {
    refAllProducts.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToFeaturedProducts = () => {
    refFeaturedProducts.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const petition = async () => {
      const { data } = await HopPassionClient.get("/stadistics/getTenProduct");
      setFavorites(data.top3)
      console.log(data.top3);
    }
    petition();
  },[])

  return (
    <div>
      <Navbar />

      {user ? (
        <Carousel>
          <Carousel.Item>
            <div className={style.imageContainer}>
              <img
                className={`d-block w-100 ${style.image}`}
                src={image1}
                alt="First slide"
              />
              <div className={style.overlay}>
                <img src={logotype} alt="Logo" className={style.logo} />
                <p className={style.description}>
                  Tu destino en línea para explorar y adquirir una amplia
                  variedad de cervezas artesanales y especialidades
                  excepcionales.
                </p>
                <hr />
                <button
                  onClick={handleScrollToAllProducts}
                  className={style.button}
                >
                  Descubre Nuestras Cervezas
                </button>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className={style.imageContainer}>
              <img
                className={`d-block w-100 ${style.image}`}
                src={image3}
                alt="First slide"
              />
              <div className={style.overlay}>
                <img src={logotype} alt="Logo" className={style.logo} />
                <p className={style.description}>
                  Descubre Nuestras Cervezas Destacadas
                </p>
                <hr />
                <button
                  className={style.button}
                  onClick={handleScrollToFeaturedProducts}
                >
                  Explorar Ahora
                </button>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      ) : (
        <Carousel>
          <Carousel.Item>
            <div className={style.imageContainer}>
              <img
                className={`d-block w-100 ${style.image}`}
                src={image1}
                alt="First slide"
              />
              <div className={style.overlay}>
                <img src={logotype} alt="Logo" className={style.logo} />
                <p className={style.description}>
                  Tu destino en línea para explorar y adquirir una amplia
                  variedad de cervezas artesanales y especialidades
                  excepcionales.
                </p>
                <hr />
                <button
                  onClick={handleScrollToAllProducts}
                  className={style.button}
                >
                  Descubre Nuestras Cervezas
                </button>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className={style.imageContainer}>
              <img
                className={`d-block w-100 ${style.image}`}
                src={image3}
                alt="First slide"
              />
              <div className={style.overlay}>
                <img src={logotype} alt="Logo" className={style.logo} />
                <p className={style.description}>
                  Descubre Nuestras Cervezas Destacadas
                </p>
                <hr />
                <button
                  className={style.button}
                  onClick={handleScrollToFeaturedProducts}
                >
                  Explorar Ahora
                </button>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className={style.imageContainer}>
              <img
                className={`d-block w-100 ${style.image}`}
                src={image2}
                alt="First slide"
              />
              <div className={style.overlay}>
                <img src={logotype} alt="Logo" className={style.logo} />
                <p className={style.description}>
                  ¡Únete a nuestra comunidad cervecera
                </p>
                <p className={style.description}>
                  y descubre un mundo de sabores!
                </p>
                <hr />
                <button onClick={handleNavigate} className={style.button}>
                  Registrate
                </button>
                <Link className={style.link} to="/login">
                  {" "}
                  <h5>o Inicia sesión</h5>
                </Link>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      )}

      <div className={style.featuredProductsContainer}>
        <div className={style.marginOne}>
          <h1 className={style.titleFeaturedProducts} ref={refFeaturedProducts}>
            Tentate con nuestros productos destacados
          </h1>
          <h2 className={style.subtitle}>Éstas son las favoritas</h2>
        </div>
        <Favorites favorites={favorites} className={style.favoritesContainer} />
        <div ref={refAllProducts}></div>
      </div>
      <Filters />
      <div className={style.marginTwo}>
        <h1 className={style.titleAllProducts}>Cervezas</h1>
        <CardContainer />
        <Footer />
      </div>
    </div>
  );
};

export default forwardRef(Home);
