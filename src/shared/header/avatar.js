import style from "./avatar.module.css";
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { useContext } from "react";

function Avatar() {
	const {store} = useContext(Context);

	return (
		<div className={style.avatar}>
			<div className={style.left}>
				<p className={style.name}>Алексей А.</p>
				<button onClick={() => store.logout()} className={style.button}>Выйти</button>
			</div>
			<div className={style.imageAvatar}></div>
		</div>
	)
}


export default observer(Avatar);