import Header from "../../shared/header/header";
import Footer from "../../shared/footer/footer";
import style from './PageSearch.module.css';
import FormSearch from "./FormSearch";
import searchMan from '../../images/SearchMan.svg';
import document from '../../images/Document.svg';
import folders from '../../images/Folders.svg';


function PageSearch() {
	return (
	  <>
		<Header/>
		<main className={style.main + " container"}>
            <div className={style.contentDiv}>
                <h1 className={style.header}>Найдите необходимые данные в пару кликов.</h1>
                <p className={style.pharagraph}>Задайте параметры поиска. Чем больше заполните, тем точнее поиск</p>
                
                <FormSearch/>
            </div>
			<div className={style.imagisDiv}>
				<div className={style.imgDoc}>
					<img className={style.imgDocoment} src={document}></img>
					<img className={style.imgFolder} src={folders}></img>
				</div>
				<img className={style.searchMan} src={searchMan}></img>
            </div>
		</main>

		<Footer/>

		
	  </>
	);
  }

  export default PageSearch;