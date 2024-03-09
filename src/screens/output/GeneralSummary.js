import TableSummary from './TableSummary';
import style from './generalSummary.module.css';


function GeneralSummary() {
	return (
	  <section className={style.generalSummary}>
        <h3>Общая сводка</h3>
        <p className={style.pharagraph}>Найдено 4 221 вариантов</p>
        <TableSummary/>
	  </section>
	);
  }

  
  export default GeneralSummary;