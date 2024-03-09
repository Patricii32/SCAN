import style from './requestData.module.css';
import imgRequest from "../../images/requestData.png";
import { useContext } from 'react';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

function RequestData() {
  const {store} = useContext(Context);

	return (
	  <section className={style.requestData}>
        <div className={style.text}>
            <h1 className={style.header}>сервис по поиску публикаций о компании по его ИНН</h1>
            <p className={style.pharagraph}>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
            {store.isAuth && <Link to="/search"><button className={style.button}>Запросить данные</button></Link>}
        </div>
        <img className={style.image} src={imgRequest} alt="Женщина работает" />
      </section>
	);
  }

  
  export default observer(RequestData);