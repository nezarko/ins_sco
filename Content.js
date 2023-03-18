import React, {useMemo,useState,useEffect,lazy,Suspense} from 'react'
import axios from "axios";
import Sidebar from '../Components/Sidebar'
import Login from '../Components/Login'
import PolPage2 from './PolPage2'
import '../Style/Content.css'
import loading from '../Images/loading.gif'
import ShowPage from './ShowPage'
import AccPage from './AccPage'
import ScoPage from './ScoPage'
import RepPage from './RepPage'
import DailyProd from '../Report/DailyProd'
import TotalProd from '../Report/TotalProd'
import Rennual from '../Report/Rennual'
import Allcheqs from '../Report/Allcheqs'
import {Routes,Route,Switch} from 'react-router-dom'
import RepTable from "../Report/RepTable";
import StaticPage from './StaticPage'
;
import EditPage from './EditPage';
import DeletePage from './DeletePage';
import AccSearchPage from './AccSearchPage';
import CurrentCheqs from '../Report/CurrentCheqs';
import ExpensesRep from '../Report/ExpensesRep';
import ScoPage2 from './ScoPage2';
import PrivetRouter from '../Components/PrivetRouter.js';
import PublicRouter from '../Components/PublicRouter';
import ReturnPage from './ReturnPage';
import EndorPage from './EndorPage';
import PolSearch from './PolSearch';
import AllCustomers from '../Report/AllCustomers';
import Expenses from './expenses';
//const PolPage2=lazy(()=>import('./PolPage2'))

export const Content = () => {

    return (
        <div className="content">
          
            <Sidebar/>
             <Switch>
               
              <PrivetRouter exact path = "/" component={PolPage2}/> 
              <PublicRouter exact path = "/login" component={Login} />
              <PrivetRouter exact path = "/endor" component={EndorPage} />
              <PrivetRouter exact path = "/edit/:rowid" component={EditPage}/>
              <PrivetRouter exact path = "/delete/:rowid" component={PolPage2}/>
              <PrivetRouter path = "/sco" component={ScoPage2}/>
              <PrivetRouter path = "/acc" component={AccSearchPage}/>
              <PrivetRouter path = "/accsearch/:rowid" component={AccPage}/>
              <PrivetRouter path = "/polsearch" component={PolSearch}/>
              <PrivetRouter path = "/show/:rowid" component={ShowPage}/>
              <PrivetRouter path = "/return/:rowid" component={ReturnPage}/>
              <PrivetRouter path = "/report" component={RepPage}/>
              <PrivetRouter path = "/static" component={StaticPage}/>
          
             <PrivetRouter path = "/dailyproduct" component={DailyProd}/>
             <PrivetRouter path = "/TotalProd" component={TotalProd}/>
             
             <PrivetRouter path = "/reneual" component={Rennual}/>
             <PrivetRouter path = "/allchecks" component={Allcheqs}/>
             <PrivetRouter path = "/nextchecks" component={CurrentCheqs}/>
             <PrivetRouter path = "/returnchecks" component={RepTable}/>
             <PrivetRouter path = "/customers" component={AllCustomers}/>
             <PrivetRouter path = "/expenses" component={Expenses}/>
             <PrivetRouter path = "/expensesrep" component={ExpensesRep}/>
            </Switch> 
           
           
            
        </div>
    )
}
export default Content
