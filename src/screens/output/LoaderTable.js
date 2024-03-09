import style from './loaderTable.module.css';
import Loader from "../../images/load.svg";


function LoaderTable() {
	return (
	  <div className={style.loaderDiv}>
        <img src={Loader} alt="" className={style.loader}></img>
        <p className={style.pharagraph}>Загружаем данные </p>
	  </div>
	);
  }

  
  export default LoaderTable;