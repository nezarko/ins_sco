import React, {useMemo,useState,useEffect} from 'react'
import axios from "axios";
import Sidebar from '../Components/Sidebar'
import PolPage2 from './PolPage2'
import '../Style/Content.css'
import ShowPage from './ShowPage'
import AccPage from './AccPage'
import ScoPage from './ScoPage'
import RepPage from './RepPage'
import DailyProd from '../Report/DailyProd'
import TotalProd from '../Report/TotalProd'
import Rennual from '../Report/Rennual'
import Allcheqs from '../Report/Allcheqs'
import {Routes,Route} from 'react-router-dom'
import RepTable from "../Report/RepTable";
import StaticPage from './StaticPage'
;
import EditPage from './EditPage';
import AccSearchPage from './AccSearchPage';
import CurrentCheqs from '../Report/CurrentCheqs';
import ScoPage2 from './ScoPage2';
export const Content = () => {

    return (
        <div className="content">
            <Sidebar/>
           
            <Routes>
              <Route exact path = "/" element={<PolPage2 />}/>
              <Route exact path = "/edit/:rowid" element={<EditPage/>}/>
              <Route path = "/sco" element={<ScoPage2  />}/>
              <Route path = "/acc" element={<AccSearchPage/>}/>
              <Route path = "/acc/:rowid" element={<AccPage />}/>
              <Route path = "/show/:rowid" element={<ShowPage />}/>
              <Route path = "/report" element={<RepPage />}/>
              <Route path = "/static" element={<StaticPage />}/>
          
             <Route path = "/dailyproduct" element={<DailyProd/>}/>
             <Route path = "/TotalProd" element={<TotalProd/>}/>
             
             <Route path = "/reneual" element={<Rennual />}/>
             <Route path = "/allchecks" element={<Allcheqs />}/>
             <Route path = "/nextchecks" element={<CurrentCheqs />}/>
             <Route path = "/returnchecks" element={<RepTable />}/>
            
          
              
            </Routes> 
            
        </div>
    )
}
export default Content
