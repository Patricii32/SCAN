import style from "./limite.module.css";
import Loader from "../../images/load.svg";
import { observer } from 'mobx-react-lite';

function Limite({companyLimit, usedCompanyCount}) {
	return (
		<div className={style.limites}>
		{(companyLimit === undefined) ? 
			<img src={Loader} alt="" className={style.loader}></img> :
			<div className={style.limiteContainer}>
				<div className={style.limite}>
					<p>Использовано компаний </p><span className={style.span}>{usedCompanyCount}</span>
				</div>
				<div className={style.limite}>
					<p>Лимит по компаниям </p><span className={style.span + " " + style.colorGreen}>{companyLimit}</span>
				</div>
			</div>
		}
		</div>
	)
}


export default observer(Limite);