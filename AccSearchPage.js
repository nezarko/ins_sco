import React, { useState ,useEffect,useRef} from 'react';
import axios from 'axios'
import moment from 'moment'
import '../Style/AccSearchPage.css'
import {FcPrint} from 'react-icons/fc'
import {FaFileExcel} from 'react-icons/fa'
import { useReactToPrint } from 'react-to-print';
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const AccSearchPage = () => {
    const [doc,setDoc]=useState('')
    const [Acc,setAcc]=useState([])
    const accsearch= ()=>{
                   
         axios.get(`http://localhost:3001/AccSearch/${doc}`)
                  .then((res)=>{ 
                    setAcc(res.data);
                   
                    console.log(Acc)
                    
                    console.log(res.data)
                  })
                 } 
                 const componentRef = useRef();
                 const handlePrint = useReactToPrint({
                 content: () => componentRef.current,
                    });
                
  return (
    <div class="container">
    <div class="row    align-items-top">
        <div class="col-md-6">
            <div class="search"> <i class="fa fa-search"></i>
             <input type="number"  onChange={(e)=>setDoc(e.target.value)} class="form-control" placeholder="ابحث من خلال رقم الوثيقة"/> 
             <button onClick={accsearch} class="btn btn-primary">بحث</button> </div>
             <button className='excle' onClick={handlePrint}><FcPrint/></button>
             <ExcelFile  element={<><button className='excle'><FaFileExcel/></button></>}>
                <ExcelSheet data={Acc} name="الانتاج الكلي">
                    <ExcelColumn label="pol_no" value="pol_no"/>
                    <ExcelColumn label="pol_year" value="pol_year"/>
                    <ExcelColumn label="ins_comp" value="ins_comp"/>
                    <ExcelColumn label="acc_type" value="acc_type"/>
                    <ExcelColumn label="cust_acc" value="cust_acc"/>
                    <ExcelColumn label="cust_name" value="cust_name"/>
                    <ExcelColumn label="cust_jaw" value="cust_jaw"/>
                    <ExcelColumn label="cover_details" value="cover_details"/>
                </ExcelSheet>
               
            </ExcelFile>
            
        </div>
    </div>
   
   
<div ref={componentRef}>
             <table class="table table-bordered">
             <thead >
               <tr>
                 <th scope="row">رقم الشيك</th>
                 <th scope="row">تاريخ الشيك</th>
                 <th scope="row">اسم صاحب الشيك</th>
                 <th scope="row">مبلغ الشيك</th>
                 <th scope="row">دفعة كاش- شيكل</th>
               </tr>
             </thead>
             
             {Acc.map((i,index)=>{
                <p>{i.cust_name}</p>
     return(
               
                 <tbody >
                 <tr >
                 <td >{i.chq_no}</td>
                 <td >{moment(i.chq_date).format("DD/MM/YYYY")}</td>
                 <td scope="row">{i.chq_owner}</td>
                 <td>{i.chq_value}</td>
                 <td > {i.cash} </td>
               </tr>
               </tbody>
             
               )
   })}
            
           </table>
           </div>
  
   
  
</div>


  )
};
export default AccSearchPage