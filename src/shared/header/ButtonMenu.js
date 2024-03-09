import style from "./buttonMenu.module.css";
import { ReactComponent as Menu } from "../../images/menu.svg"

function ButtonMenu() {
	return (
		<button className={style.button}>
			<Menu/>
		</button>
	)
}


export default ButtonMenu;