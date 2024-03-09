import style from './autorization.module.css';
import google from '../../images/google.svg';
import facebook from '../../images/facebook.svg';
import yandex from '../../images/yandex.svg';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';


function Authorization() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginDirty, setLoginDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [erorLogin, setErorLogin] = useState("Введите корректные данные");
  const [erorPassword, setErorPassword] = useState("Неправильный пароль");
  const [validForm, setValidForm] = useState(false);
  const {store} = useContext(Context);

  useEffect(() => {
    if(erorLogin || erorPassword) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [erorLogin, erorPassword])

  const handlerLogin = (e) => {
    setLogin(e.target.value)
    if(String(e.target.value).indexOf(' ') >= 0) {
      setErorLogin('Введите корректные данные')
    } else if(!e.target.value) {
      setErorLogin('Логин не должен быть пустым')
    } else {
      setErorLogin('')
    }
  }

  const handlerPassword = (e) => {
    setPassword(e.target.value)
    if(e.target.value.length < 5 || e.target.value.length > 20) {
      setErorPassword('Пароль должен быть длиннее 5 и меньше 20 символов')
      if(!e.target.value) {
        setErorPassword('Пароль не должен быть пустым')
      }
    } else {
      setErorPassword('')
    }
  }

  const handlerBlur = (e) => {
    switch (e.target.name) {
      case 'login':
        setLoginDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
      default:
        console.log(e);
    }
  }

	return (
	  <div className={style.autorization}>
        <div className={style.buttonsHeader}>
            <button className={style.buttonHeader + " " + style.activeHeaderButton}>Войти</button>
            <button className={style.buttonHeader}>Зарегистрироваться</button>
        </div>
        <form className={style.form}>
            <label className={style.label} htmlFor="username">Логин или номер телефона:</label>
            <input
              onBlur={(e) => handlerBlur(e)}
              onChange={(e) => handlerLogin(e)}
              value={login}
              className={(loginDirty && erorLogin) ? style.input + ' ' + style.error : style.input} 
              type="text"
              name = "login"
              id="username">
            </input>
            {(loginDirty && erorLogin) && <p className={style.erorLogin}>{erorLogin}</p>}
            <label className={style.label} htmlFor="password">Пароль:</label>
            <input
              onBlur={(e) => handlerBlur(e)}
              onChange={e => handlerPassword(e)}
              value={password}
              className={(passwordDirty && erorPassword) ? style.input + ' ' + style.error : style.input} 
              type="password"
              name = "password" 
              id="password">
            </input>
            {(passwordDirty && erorPassword) && <p className={style.erorPassword}>{erorPassword}</p>}
            <button 
              onClick={(event) => {
                event.preventDefault()
                store.login(login, password)
              }}
              className={style.buttonEnter}
              disabled={!validForm}>Войти</button>
            <button className={style.buttonRecover}>Восстановить пароль</button>
            <label className={style.label}>Войти через:</label>
            <div className={style.social}>
                <button  className={style.bottonVia}><img src={google} alt=''></img></button >
                <button  className={style.bottonVia}><img src={facebook} alt=''></img></button >
                <button  className={style.bottonVia}><img src={yandex} alt=''></img></button >
            </div>
        </form>
      </div>
	);
  }

  export default observer(Authorization);