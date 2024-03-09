import axios from "axios";
import { API_URL_SEARCH } from "../http/url";

export default class HistogramsService {
    static async histograms(histogramsData) {
        return await axios.post(`${API_URL_SEARCH}/objectsearch/histograms`, 
          histogramsData,
          {headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }}
        )
    }       
}