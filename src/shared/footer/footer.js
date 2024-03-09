import style from './footer.module.css';
import logoFooter from "../../images/logofooter.png"

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerContainer + " container"}>
        <img src={logoFooter} alt="logo" width={'111px'}/>
        <div>
          <p className={style.pharagraph}>г. Москва, Цветной б-р, 40</p>
          <p className={style.pharagraph}><a href="tel:+74957712111">+7 495 771 21 11</a></p>
          <p className={style.pharagraph}><a href="mailto:info@skan.ru">info@skan.ru</a></p>
          <br/>
          <p className={style.pharagraph + " " + style.fontSize}>Copyright. 2024</p>
        </div>
      </div>
    </footer>
  );
}


export default Footer;