import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import HistogramsService from "../services/HistogramsService";
import axios from "axios";
import { API_URL } from "../http";
import ObjectSearchService from "../services/ObjectsearchService";

export default class Store {
    isAuth = false;
    eventFiltersInfo = {};
    histogramsData = {};
    generalSummary = [];


    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setGeneralSummary(data) {
        this.generalSummary = data
    }

    setHistogramsData(dataStart, dataEnd, inn, fullness, limit, inBusinessNews, onlyMainRole, tonality, onlyWithRiskFactors) { //searchRangeStart, searchRangeEnd, inn, completeness, countDocuments, business, role, tonality, risk, news, announcements, summary
        const dataObj = {
            "issueDateInterval": {
                "startDate": dataStart,
                "endDate": dataEnd
              },
              "searchContext": {
                "targetSearchEntitiesContext": {
                  "targetSearchEntities": [
                    {
                      "type": "company",
                      "sparkId": null,
                      "entityId": null,
                      "inn": inn,
                      "maxFullness": fullness, //Признак максимальной полноты булевое
                      "inBusinessNews": inBusinessNews //бизнес контекст наличие или отсутствие буливое или нулл
                    }
                  ],
                  "onlyMainRole": onlyMainRole, //Главная роль в отношении целевых объектов булевое
                  "tonality": tonality, //тональность negative, positive, any
                  "onlyWithRiskFactors": onlyWithRiskFactors, //риск булевое
                  "riskFactors": {
                    "and": [],
                    "or": [],
                    "not": []
                  },
                  "themes": {
                    "and": [],
                    "or": [],
                    "not": []
                  }
                },
                "themesFilter": {
                  "and": [],
                  "or": [],
                  "not": []
                }
              },
              "searchArea": {
                "includedSources": [],
                "excludedSources": [],
                "includedSourceGroups": [],
                "excludedSourceGroups": []
              },
              "attributeFilters": {
                "excludeTechNews": true,
                "excludeAnnouncements": true,
                "excludeDigests": true
              },
              "similarMode": "duplicates",
              "limit": Number(limit),
              "sortType": "sourceInfluence",
              "sortDirectionType": "desc",
              "intervalType": "month",
              "histogramTypes": [
                "totalDocuments",
                "riskFactors"
              ]
          }

          localStorage.setItem('histogramsData', JSON.stringify(dataObj))
        this.histogramsData = dataObj
        
    }


    setEventFiltersInfo(eventFiltersInfo) {
        this.eventFiltersInfo = eventFiltersInfo;
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            this.setAuth(true);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('login', email)
            localStorage.setItem('password', password)
            const resp = await axios.get(`${API_URL}/info`, {
                headers: `Authorization: Bearer ${localStorage.getItem('token')}`
            })
            this.setEventFiltersInfo(resp.data.eventFiltersInfo);
            window.location.assign('/Scan/#/');
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('login');
            localStorage.removeItem('password');
            this.setAuth(false);
            this.setEventFiltersInfo({});
            window.location.assign("/Scan/#/");
    }

    async checkAuth() {
        try {
            const login = localStorage.getItem('login');
            const password = localStorage.getItem('password');
            const response = await AuthService.login(login, password);
            this.setAuth(true);
            localStorage.setItem('token', response.data.accessToken);
            const resp = await axios.get(`${API_URL}/info`, {
                headers: `Authorization: Bearer ${localStorage.getItem('token')}`
            })
            this.setEventFiltersInfo(resp.data.eventFiltersInfo);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async objectSearch() {
        try {
            const response = await ObjectSearchService.objectSearch(this.histogramsData);
            const arrItems = response.data.items
            let idDocument = {
                ids: []
            }
            arrItems.forEach(element => {
                idDocument.ids.push(element.encodedId)
            });
            
            const resp = await axios.post("https://gateway.scan-interfax.ru/api/v1/documents", idDocument,
                {headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }}
            )

            
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
}