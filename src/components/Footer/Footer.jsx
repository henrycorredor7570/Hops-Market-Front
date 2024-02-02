import style from "./Footer.module.css";
import logo_light from "../../assets/logo_light.png";
import visa from "../../assets/visa.png";
import mastercard from "../../assets/mastercard.png";
import cabal from "../../assets/cabal.png";
import naranja from "../../assets/naranja.png";
import american from "../../assets/american.png";


export default function Footer() {
  return (
    <div className={style.container}>
      <div className={style.container__left}>
        <img src={logo_light} alt="" className={style.logoLight} />
        <div className={style.subtitle}>Descubrí, Saboreá, Disfrutá: </div>
        <div className={style.subtitle}> El Arte de la Cerveza en un Click.</div>
      </div>
      <div className={style.container__right}>
        <div className={style.container_right__detail}>
          <div className={style.titles}>Medios de pago</div>
          <div className={style.container_right_detail__payment}>
            <div className={style.paymentMethodContainer}>
            <img src={visa} alt="" className={style.paymentMethod}/>
            <img src={mastercard} alt="" className={style.paymentMethod}/>
            <img src={cabal} alt="" className={style.paymentMethod}/>
            <img src={american} alt="" className={style.paymentMethod}/>
            <img src={naranja} alt="" className={style.paymentMethod}/>
            </div>
          </div>
        </div>
        <div className={style.container_right__detail}>
          <div className={style.titles}>Acerca de</div>
          <div className={style.whiteText}>Envíos</div>
        </div>
        <div className={style.container_right__detail}>
          <div className={style.titles}>Info</div>
          <div className={style.whiteText}> soporte@hoppassion.com</div>
          <div className={style.whiteText}>Política de privacidad</div>
          <div className={style.whiteText}>Términos y condiciones</div>
        </div>
      </div>
    </div>
  );
}
