import style from './buttonScroll.module.css';

function ButtonScroll({onClick, disabled, images}) {
	return (
	  <button className={style.button} onClick={onClick} disabled={disabled}>
        <img src={images}></img>
	  </button>
	);
  }

  export default ButtonScroll;