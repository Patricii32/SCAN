import style from './sliderComponent.module.css';

function SliderComponent({ content, img }) {
	return (
	  <div className={style.sliderComponent}>
        <img className={style.images} src={img} alt=""></img>
        <p className={style.paragraph}>{content}</p>
      </div>
	);
  }

  
  export default SliderComponent;