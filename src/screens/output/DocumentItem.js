import style from './documentItem.module.css';
import dateString from '../../services/dataString';


function DocumentItem({itemData}) {
    console.log(itemData)
    const name = itemData.source.name.split('(')[0];
    const url = itemData.source.name.split('(')[1] ? itemData.source.name.split('(')[1].replace(')', '') : itemData.source.name

	return (
	  <li className={style.documentItem}>
        <div className={style.header}> 
            <p className={style.paragraphNumber}>
                {
                    dateString(String(itemData.issueDate))
                }
            </p>
            <a className={style.link} href={`https://${url}`} target="_blank">{name}</a>
        </div>
        <h4 className={style.headerText}>{itemData.title.text}</h4>
        <div className={style.categiry}>Технические новости</div>
        <img className={style.images} src=''></img>
        <div className={style.paragraphDiv}>
            <p className={style.paragraph}>
                SkillFactory — школа для всех, кто хочет изменить свою карьеру и жизнь. С 2016 года обучение прошли 20 000+ человек из 40 стран с 4 континентов, самому взрослому студенту сейчас 86 лет. Выпускники работают в Сбере, Cisco, Bayer, Nvidia, МТС, Ростелекоме, Mail.ru, Яндексе, Ozon и других топовых компаниях.
            </p>
            <p className={style.paragraph}>
                Принципы SkillFactory: акцент на практике, забота о студентах и ориентир на трудоустройство. 80% обучения — выполнение упражнений и реальных проектов. Каждого студента поддерживают менторы, 2 саппорт-линии и комьюнити курса. А карьерный центр помогает составить резюме, подготовиться к собеседованиям и познакомиться с IT-рекрутерами.
            </p>
        </div>
        <div className={style.footer}>
            <a href={`${itemData.url}`} target="_blank"><button className={style.button}>Читать в источнике</button></a>
            <p className={style.paragraphNumber}>{itemData.attributes.wordCount} слова</p>
        </div>
	  </li>
	);
  }

  
  export default DocumentItem;