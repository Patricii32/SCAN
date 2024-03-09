import style from './headerOutput.module.css';
import WomenSearch from '../../images/WomenSearch.svg'


function HeaderOutput() {
	return (
	  <section className={style.headerOutput}>
        <div className={style.headerOutputDiv}>
            <h1 className={style.headerText}>Ищем. Скоро будут результаты</h1>
            <p className={style.pharagraphText}>Поиск может занять некоторое время, просим сохранять терпение.</p>
        </div>
        <img className={style.imgWomenSearch} src={WomenSearch} ></img>
	  </section>
	);
  }


  export default HeaderOutput;