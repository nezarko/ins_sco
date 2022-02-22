import React from 'react'
import '../Style/RepPage.css'
import { ReportData } from '../Components/ReportData'
import {Link,NavLink} from 'react-router-dom'
import { Form, Button,Container,Row,Col, FormGroup, FormControl, ControlLabel,Image,Table,ButtonGroup } from "react-bootstrap";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import ReportMenue from '../Report/ReportMenue'

const RepPage=()=>{
   
    return(
       
        <div className='main'> 
         <ReportMenue/>
        
        </div>
     
    )
}
export default RepPage