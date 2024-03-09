import style from './tableSummary.module.css';
import { useState, useRef, useEffect} from "react";
import debounce from "lodash.debounce";
import ButtonScroll from './ButtonScroll';
import leftTable from '../../images/leftTable.svg';
import rightTable from '../../images/rightTable.svg';
import { observer } from 'mobx-react-lite';
import HistogramsService from '../../services/HistogramsService';
import dateString from '../../services/dataString';
import LoaderTable from './LoaderTable';

function TableSummary() {
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [dataResponceAll, setDataResponceAll] = useState([]);
    const [dataResponceRisk, setDataResponceRisk] = useState([]);
    const [loader, setLoader] = useState(false)

	useEffect(() => {
        const dates = JSON.parse(localStorage.getItem('histogramsData'));
        const histogramsRes = async () => {
            try {
                const response = await HistogramsService.histograms(dates);
                setDataResponceAll(response.data.data[0].data)
                setDataResponceRisk(response.data.data[1].data)
                setLoader(true)
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        }
        histogramsRes();
	}, [])

    const listRef = useRef(null);

    const checkForScrollPosition = () => {
        const { current } = listRef;
        if (current) {
        const { scrollLeft, scrollWidth, clientWidth } = current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft !== scrollWidth - clientWidth);
        }
    };

    const debounceCheckForScrollPosition = debounce(checkForScrollPosition, 200);

    const scrollContainerBy = (distance) =>
        listRef.current?.scrollBy({ left: distance, behavior: "smooth" });

    useEffect(() => {
        const { current } = listRef;
        checkForScrollPosition();
        current?.addEventListener("scroll", debounceCheckForScrollPosition);

        return () => {
        current?.removeEventListener("scroll", debounceCheckForScrollPosition);
        debounceCheckForScrollPosition.cancel();
        };
    }, []);

	return (
        <div className={style.containerTable}>
            <ButtonScroll onClick={() => scrollContainerBy(-1021)} disabled={!canScrollLeft} images={leftTable}/>
            <div className={style.tableSummary}>
            <div className={style.headerSummary + " " + style.table + " " + style.tableHeader}>
                <p className={style.pharagraphTableHeader}>Период</p>
                <p className={style.pharagraphTableHeader}>Всего</p>
                <p className={style.pharagraphTableHeader}>Риски</p>
            </div>
            <ul className={style.scrollTable} ref={listRef}>
                {
                    loader ? dataResponceAll.map((elem, id) => {
                    return (
                        <li key={id} className={style.tableContent}>
                            <div className={style.tableDiv}>
                                <p className={style.pharagraphTable}>{
                                    dateString(elem.date)
                                }</p>
                                <p className={style.pharagraphTable}>{elem.value}</p>
                                <p className={style.pharagraphTable}>{dataResponceRisk[id].value}</p>
                            </div>
                        </li>
                    )
                }) : <LoaderTable/>
                }
            </ul>
        </div>
        <ButtonScroll onClick={() => scrollContainerBy(1021)} disabled={!canScrollRight} images={rightTable}/>
    </div>
	);
  }

  export default observer(TableSummary);