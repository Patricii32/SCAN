import { useContext, useEffect } from 'react';
import style from './App.module.css';
import PagesAuthorization from './screens/authorization/PagesAuthorization';
import Main from './screens/main/Main';
import { Route, Routes } from "react-router-dom";
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import PageSearch from './screens/search/PageSearch'
import Output from './screens/output/Output';


function App() {
  const {store} = useContext(Context);

  useEffect(() => {
    if(localStorage.getItem('token')) {
      store.checkAuth()
    }
  })

  return (
    <>
      <Routes>
				<Route path="/" element={
					 <Main/>
				} />
				<Route path="/authorization" element={ 
          <PagesAuthorization/> 
        }/>
        <Route path="/search" element={ 
          <PageSearch/> 
        }/>
        <Route path="/output" element={ 
          <Output/> 
        }/>
			</Routes>	
    </>
  );
}


export default observer(App);
