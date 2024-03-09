import DocumentItem from './DocumentItem';
import style from './listDocument.module.css';
import ObjectSearchService from '../../services/ObjectsearchService';
import { useEffect, useState } from 'react';
import axios from 'axios';


function ListDocument() {
    const [idsArr, setIdsArr] = useState();
    const [itemInfo, setItemInfo] = useState();
    const [count, setCount] = useState(0);

    useEffect(() => {
      const dates = JSON.parse(localStorage.getItem('histogramsData'));
      const objectSearchRes = async () => {
          try {
              const response = await ObjectSearchService.objectSearch(dates);
              const arrItems = response.data.items

              let size = 10; 
              let subarray = []; //массив в который будет выведен результат.
              for (let i = 0; i <Math.ceil(arrItems.length/size); i++){
                  subarray[i] = arrItems.slice((i*size), (i*size) + size);
              }
              setIdsArr(subarray)
              setCount(1)
              let idDocument = {
                  ids: []
              }
              subarray[0].forEach(element => {
                  idDocument.ids.push(element.encodedId)
              });
              
              const resp = await axios.post("https://gateway.scan-interfax.ru/api/v1/documents", idDocument,
                  {headers: {
                      'Content-Type': 'application/json',
                      "Authorization": `Bearer ${localStorage.getItem('token')}`
                  }}
              )
              setItemInfo(resp.data)
          } catch (e) {
              console.log(e.response?.data?.message);
          }
      }
      objectSearchRes();
  }, [])


	return (
	  <section className={style.listDocument}>
        <h3 className={style.header}>Список документов</h3>
        <ul className={style.documents}>
          {
            itemInfo &&
            itemInfo.map((elem) => {
              console.log(elem.ok)
              return (<DocumentItem itemData={elem.ok}/>)
            })
          }
        </ul>
        <button className={style.button}>Паказать больше</button>
	  </section>
	);
  }

  export default ListDocument;