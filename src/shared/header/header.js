import style from './header.module.css';
import Unregistered from './unregistered';
import HeaderNav from './headerNav';
import Avatar from './avatar';
import Limite from './limite';
import ButtonMenu from './ButtonMenu';
import { ReactComponent as Logo } from "../../images/logo.svg"
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';

function Header() {
  const {store} = useContext(Context);
  //const [authorized, setAuthorized] = useState(store.isAuth ? true : false);
  
  return (
    <header className={style.header + " container"}>
      <Link to="/"><Logo/></Link>
      <div className="displayNonePhone">
        <HeaderNav/>
      </div>
      { 
        store.isAuth &&
          <div className={style.limite}>
            <Limite companyLimit={store.eventFiltersInfo.companyLimit} usedCompanyCount={store.eventFiltersInfo.usedCompanyCount}/>
          </div>
      }
      <div className="displayNonePhone">
        {store.isAuth ? <Avatar/> : <Unregistered/>}
      </div>
      <div className="displayNoneDesctop">
        <ButtonMenu/>
      </div>
      
    </header>
  );
}


export default observer(Header);