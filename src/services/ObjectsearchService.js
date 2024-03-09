import axios from "axios";
import { API_URL_SEARCH } from "../http/url";

export default class ObjectSearchService {
    static async objectSearch(histogramsData) {
        return await axios.post(`${API_URL_SEARCH}/objectsearch`, 
          histogramsData,
          {headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }}
        )
    }       
}