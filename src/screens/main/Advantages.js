import style from './advantages.module.css';
import SimpleSlider from "./Slider";

function Adventages() {
	return (
	  <section className={style.adventages}>
        <h2 className={style.header}>Почему именно мы</h2>
        <SimpleSlider/>
      </section>
	);
  }

  
  export default Adventages;