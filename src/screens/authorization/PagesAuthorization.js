import Header from "../../shared/header/header";
import Footer from "../../shared/footer/footer";
import style from './pagesAuthorization.module.css';
import Authorization from "./Autorization";
import characters from '../../images/Characters.svg';
import castle from '../../images/castle.png'


function PagesAuthorization() {
	return (
	  <>
		<Header/>
		<main className={style.main + " container"}>
			<h1 className={style.header}>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
			<img className={style.imgCastle} src={castle}></img>
			<Authorization/>
			<img className={style.imgCharacters} src={characters}></img>
		</main>
		<div className={style.containerFooters}>
			<Footer/>
		</div>
		
	  </>
	);
  }

  
  export default PagesAuthorization;