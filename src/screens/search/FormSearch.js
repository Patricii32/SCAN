import validateInn from '../../services/valideInn';
import style from './FormSearch.module.css';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";

function FormSearch() {

    const [inn, setInn] = useState(""); //использую
    const [tonality, setTonality] = useState("any"); //использую
    const [countDocuments, setCountDocuments] = useState(""); //использую
    const [searchRangeStart, setSearchRangeStart] = useState(""); //использую
    const [searchRangeEnd, setSearchRangeEnd] = useState(""); //использую

    const [completeness, setCompleteness] = useState(false) //использую
    const [business, setBusiness] = useState(false) //использую
    const [role, setRole] = useState(false) //использую
    const [risk, setRisk] = useState(false) //использую
    const [news, setNews] = useState(false)
    const [announcements, setAnnouncements] = useState(false)
    const [summary, setSummary] = useState(false)

    const [innDirty, setInnDirty] = useState(false);
    const [countDocumentsDirty, setCountDocumentsDirty] = useState(false);
    const [searchRangeStartDirty, setSearchRangeStartDirty] = useState(false);
    const [searchRangeEndDirty, setSearchRangeEndDirty] = useState(false);
    const [erorInn, setErorInn] = useState("Введите корректные данные");
    const [erorCountDocuments, setErorCountDocuments] = useState("Введите корректные данные");
    const [erorSearchRange, setErorSearchRange] = useState("Введите корректные данные");
    const [validForm, setValidForm] = useState(false);

    const {store} = useContext(Context);

    useEffect(() => {
        if(erorInn || erorCountDocuments || erorSearchRange) {
          setValidForm(false)
        } else {
          setValidForm(true)
        }
    }, [erorInn, erorCountDocuments, erorSearchRange])

    const handlerCheckbox = (e) => {
        switch (e.target.name) {
            case 'completeness':
                setCompleteness(!completeness)
                break
            case 'business':
                setBusiness(!business)
                break
            case 'role':
                setRole(!role)
                break
            case 'risk':
                setRisk(!risk)
                break
            case 'news':
                setNews(!news)
                break
            case 'announcements':
                setAnnouncements(!announcements)
                break
            case 'summary':
                setSummary(!summary)
                break
            default:
                console.log(e);
        }
    }

    const handlerBlur = (e) => {
        switch (e.target.name) {
            case 'inn':
                setInnDirty(true)
                break
            case 'searchRangeStart':
                setSearchRangeStartDirty(true)
                break
            case 'searchRangeEnd':
                setSearchRangeEndDirty(true)
                break
            case 'countDocuments':
                setCountDocumentsDirty(true)
                break
            default:
                console.log(e);
        }
    }
    

    const handlerInn = (e) => {
        setInn(e.target.value)
        if(!validateInn(e.target.value, {})) {
            setErorInn('Введите корректные данные')
        } else {
            setErorInn('')
        }
    }
  

    const handlerTonality = (e) => {
        setTonality(e.target.value)
    }

    const handlerCountDocuments = (e) => {
        setCountDocuments(e.target.value)
        if(!e.target.value) {
            setErorCountDocuments('Обязательное поле')
        } else if(Number(e.target.value) < 1 || Number(e.target.value) > 1000) {
            setErorCountDocuments('Введите корректные данные')
        } else {
            setErorCountDocuments('')
        }
    }

    const handlerSearchRange = (e) => {
        let now = new Date();
        switch (e.target.name) {
            case 'searchRangeStart':
                setSearchRangeStart(e.target.value)
                if(now <= Date.parse(e.target.value)) {
                    console.log('afdrvafm')
                    setErorSearchRange('Дата не может быть будущего времени')
                } else if ((searchRangeEnd < e.target.value) || (e.target.value === undefined)) {
                    setErorSearchRange('Введите корректные данные')
                } else {
                    setErorSearchRange('')
                }
                break
            case 'searchRangeEnd':
                setSearchRangeEnd(e.target.value)
                if((searchRangeStart > e.target.value) || (e.target.value === undefined)) {
                    setErorSearchRange('Введите корректные данные')
                } else if (now <= Date.parse(e.target.value)) {
                    setErorSearchRange('Дата не может быть будущего времени')
                } else {
                    setErorSearchRange('')
                }
                break
            default:
                console.log(e);
        }
    }

	return (
	  <div className={style.formSearch}>
        <form className={style.form}>
            <div className={style.containerInput}>
                <label className={style.label} htmlFor="username">ИНН компании<span className={(innDirty && erorInn) ? style.spanEror : style.span}>*</span></label>
                <div>
                    <input
                        placeholder='10 цифр'
                        onChange={(e) => handlerInn(e)}
                        onBlur={(e) => handlerBlur(e)}
                        value={inn}
                        className={(innDirty && erorInn) ? style.input + ' ' + style.error : style.input} 
                        type="number"
                        name = "inn">
                    </input>
                    {(innDirty && erorInn) && <p className={style.erorMassege}>{erorInn}</p>}
                </div>
                <label className={style.label} htmlFor="password">Тональность</label>
                <select value={tonality}
                    onChange={(e) => handlerTonality(e)}
                    className={style.input + ' ' + style.inputOpen} 
                    name="tonality" 
                    id="tonality">

                    <option value="any">Любая</option>
                    <option value="negative">Негативная</option>
                    <option value="positive">Позитивная</option>
                </select>
                <label className={style.label} htmlFor="password">Количество документов в выдаче<span className={(countDocumentsDirty && erorCountDocuments) ? style.spanEror : style.span}>*</span></label>
                <div>
                    <input
                        placeholder='От 1 до 1000'
                        onChange={(e) => handlerCountDocuments(e)}
                        onBlur={(e) => handlerBlur(e)}
                        value={countDocuments}
                        className={(countDocumentsDirty && erorCountDocuments) ? style.input + ' ' + style.error : style.input} 
                        type="number"
                        name = "countDocuments">
                    </input>
                    {(countDocumentsDirty && erorCountDocuments) && <p className={style.erorMassege}>{erorCountDocuments}</p>}
                </div>
                <label className={style.label} htmlFor="password">Диапазон поиска<span className={((searchRangeEndDirty && searchRangeStartDirty) && erorSearchRange) ? style.spanEror : style.span}>*</span></label>
                  <div className={style.labelDate}>
                    <input 
                        onBlur={(e) => handlerBlur(e)}
                        value={searchRangeStart}
                        onChange={(e) => {handlerSearchRange(e)}}
                        className={((searchRangeEndDirty || searchRangeStartDirty) && erorSearchRange) ? style.input + ' ' + style.inputDate + ' ' + style.inputOpen + ' ' + style.error : style.input + ' ' + style.inputDate + ' ' + style.inputOpen}  
                        type="date" 
                        name="searchRangeStart" 
                        data-placeholder="Дата начала" 
                        required aria-required="true" />
                    <input 
                        onBlur={(e) => handlerBlur(e)}
                        value={searchRangeEnd}
                        onChange={(e) => {handlerSearchRange(e)}}
                        className={((searchRangeEndDirty || searchRangeStartDirty) && erorSearchRange) ? style.input + ' ' + style.inputDate + ' ' + style.inputOpen + ' ' + style.error : style.input + ' ' + style.inputDate + ' ' + style.inputOpen}
                        type="date" 
                        name="searchRangeEnd" 
                        data-placeholder="Дата конца"
                        required aria-required="true" />
                        {((searchRangeEndDirty || searchRangeStartDirty) && erorSearchRange) && <p className={style.erorMassege + " " + style.erorMassegeDate}>{erorSearchRange}</p>}
                  </div>
                  
            </div>
            <div className={style.containerCheckbox}>
                <div className={style.checkbox}>
                    <input onClick={(e) => handlerCheckbox(e)} value={completeness} className={style.customCheckbox} type="checkbox" id="completeness" name="completeness"/>
                    <label htmlFor="completeness" className={style.labelCheckbox}>Признак максимальной полноты</label>
                </div>
                <div className={style.checkbox}>
                    <input onClick={(e) => handlerCheckbox(e)} value={business} className={style.customCheckbox} type="checkbox" id="business" name="business" />
                    <label htmlFor="business" className={style.labelCheckbox}>Упоминания в бизнес-контексте</label>
                </div>
                <div className={style.checkbox}>
                    <input onClick={(e) => handlerCheckbox(e)} value={role} className={style.customCheckbox} type="checkbox" id="role" name="role" />
                    <label htmlFor="role" className={style.labelCheckbox}>Главная роль в публикации</label>
                </div>
                <div className={style.checkbox}>
                    <input onClick={(e) => handlerCheckbox(e)} value={risk} className={style.customCheckbox} type="checkbox" id="risk" name="risk" />
                    <label htmlFor="risk" className={style.labelCheckbox}>Публикации только с риск-факторами</label>
                </div>
                <div className={style.checkbox}>
                    <input onClick={(e) => handlerCheckbox(e)} value={news} className={style.customCheckbox} type="checkbox" id="news" name="news" />
                    <label htmlFor="news" className={style.labelCheckbox}>Включать технические новости рынков</label>
                </div>
                <div className={style.checkbox}>
                    <input onClick={(e) => handlerCheckbox(e)} value={announcements} className={style.customCheckbox} type="checkbox" id="announcements" name="announcements" />
                    <label htmlFor="announcements" className={style.labelCheckbox}>Включать анонсы и календари</label>
                </div>
                <div className={style.checkbox}>
                    <input onClick={(e) => handlerCheckbox(e)} value={summary} className={style.customCheckbox} type="checkbox" id="summary" name="summary" />
                    <label htmlFor="summary" className={style.labelCheckbox}>Включать сводки новостей</label>
                </div>
                <Link to="/output">
                    <button 
                    onClick={(event) => {
                        
                        store.setHistogramsData(searchRangeStart, searchRangeEnd, inn, completeness, countDocuments, business, role, tonality, risk, news, announcements, summary)
                    }}
                    className={style.buttonSearch}
                    disabled={!validForm}>Поиск</button>
                </Link>
                
                  <p className={style.hint}>* Обязательные к заполнению поля</p>
            </div>
        </form>
      </div>
	);
  }

  export default observer(FormSearch);