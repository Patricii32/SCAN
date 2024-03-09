import Header from "../../shared/header/header";
import Footer from "../../shared/footer/footer";
import style from './main.module.css';
import RequestData from "./RequestData";
import Adventages from "./Advantages";
import selectImg from "../../images/selectImg.png"
import Tariffs from "./Tariffs";


function Main() {
	return (
	  <>
		<Header/>
		  <main className={style.main + " container"}>
			<RequestData/>
			<Adventages/>
			<img className={style.image} src={selectImg}></img>
			<Tariffs/>
		  </main>
		<Footer/>
	  </>
	);
  }

  
  export default Main;