import React, { useState ,useEffect,useRef} from 'react';
import axios from 'axios'
import moment from 'moment'
import '../Style/AccSearchPage.css'
import {FcPrint} from 'react-icons/fc'
import {FaFileExcel} from 'react-icons/fa'
import { useReactToPrint } from 'react-to-print';
import ReactExport from "react-export-excel";
import {FormControl,TextField} from '@mui/material';
import { Button, Modal,Col ,Table} from '@themesberg/react-bootstrap';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const url="http://localhost:3000";
const lurl="https://alwafi.thesmartlogic.com";
export const AccSearchPage = () => {
    const [doc,setDoc]=useState()
    const [Acc,setAcc]=useState([])
    const [comp,setComp]=useState()
    const [accdt,setAccdt]=useState([])
    const [date1,setDate1]=useState()
  const [date2,setDate2]=useState()
  const [msg,setMsg]=useState("")
  const[status,setstatus]=useState('')
    const [showDefault, setShowDefault] = useState(false);
    const handleClose = () => setShowDefault(false);
    var d = Date(Date.now());
   var a = d.toString()
   a=moment(a).format("DD/MM/YYYY")
   //var sum=0

   const accdtl=async() => {
    axios.get(`${url}/Accdt/${doc}/${date1}/${date2}`)
    .then((res)=>{ 
      setAccdt(res.data);
      console.log(res.data)
      console.log(accdt)
     
    })
}
 
    const accsearch= ()=>{
                   
         axios.get(`${url}/AccSearch/${doc}`)
                  .then((res)=>{ 
                    setAcc(res.data);
                   
                  })
                 } 
                 const componentRef = useRef();
                 const handlePrint = useReactToPrint({
                 content: () => componentRef.current,
                    });
                    const componentRef2 = useRef();
                    const handlePrint2 = useReactToPrint({
                    content: () => componentRef2.current,
                       });
           
  return (
    <div class="container">
    <div class="    align-items-top">
        <div class="col-md-6">
            <div class="search"> 
             <input type="number"  onChange={(e)=>setDoc(e.target.value)} className="sinput form-control" placeholder=" ابحث من خلال رقم الوثيقة\رقم الحساب"/> 
             <button onClick={accsearch} class="btn btn-primary">بحث</button>
             <Button variant="primary"  className="my-1 m-3" onClick={() => setShowDefault(true)}>كشف حساب</Button>
              </div>
             
             <button className='excle' onClick={handlePrint}><  FcPrint/></button>
             <ExcelFile  element={<><button className='excle'><FaFileExcel/></button></>}>
                <ExcelSheet data={Acc} name=" تفاصيل الشيكات">
                    <ExcelColumn label="polno" value="polno"/>
                    <ExcelColumn label="pol_year" value="pol_year"/>
                    <ExcelColumn label="cust_acc" value="cust_acc"/>
                    <ExcelColumn label="cust_name" value="cust_name"/>
                    <ExcelColumn label="total_prem" value="total_prem"/>
                    <ExcelColumn label="reg_dt" value="reg_dt"/>
                    <ExcelColumn label="cash" value="cash"/>
                    <ExcelColumn label="chq_owner" value="chq_owner"/>
                    <ExcelColumn label="chq_value" value="chq_value"/>
                    <ExcelColumn label="chq_date" value="chq_date"/>
                </ExcelSheet>
               
            </ExcelFile>
            
        </div>
    </div>
   
   
<div ref={componentRef}>
             <table class="table table-striped">
             <thead >
               <tr>
               <th scope="row">رقم الوثيقة</th>
               <th scope="row">البنك</th>
                 <th scope="row">رقم الشيك</th>
                 <th scope="row">تاريخ الشيك</th>
                 <th scope="row">اسم صاحب الشيك</th>
                 <th scope="row">مبلغ الشيك</th>
                 <th scope="row">دفعة كاش- شيكل</th>
               </tr>
             </thead>
             
             {Acc.map((i,index)=>{
               
     return(
               
                 <tbody >
                 <tr >
                 <td >{i.polno}</td>
                 <td >{i.bank}</td>
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

           <div >
           <React.Fragment >

      <Modal  style={{marginTop:"2rem",color:"#004960",}} as={Modal.Dialog} fullscreen={true} centered show={showDefault} onHide={handleClose}>
    <Modal.Header>
    <button className='excle' onClick={handlePrint2}><FcPrint/></button>
      <Modal.Title className="h6">  <input type="number"  onChange={(e)=>setDoc(e.target.value)} class="form-control" placeholder=" ابحث من خلال رقم الحساب"/> </Modal.Title>
      <FormControl as={Col} id="outlined-basic">
          <TextField size="small" helperText=" من تاريخ" variant="outlined"  type="date"  onChange={(e)=>{setDate1(e.target.value)}}  />
           </FormControl>
           <FormControl as={Col} id="outlined-basic">
           <TextField size='small'  helperText=" الى تاريخ"   variant="outlined" type="date"   onChange={(e)=>{setDate2(e.target.value)}} />
            </FormControl>
     
           <FormControl as={Col} id="outlined-basic">
            <Button size='small' onClick={accdtl}>بحث</Button>
            </FormControl>
      <Button variant="close" aria-label="Close" onClick={handleClose} />
    </Modal.Header>
    <Modal.Body ref={componentRef2}>
    <div className='acc-header'>
    <h3 class="card-title">شركة فلسطين للتأمين</h3>
    <h3 class="card-title">شركة المسافر للتأمين</h3>
      <section>{a}</section>
    
    </div>
    <table class="table  text-center">

<thead >
  
  <tr>
  <th scope="row"> مجموع مبلغ الشيكات</th>
  <th scope="row">مجموع مبلغ النقدي</th>
    <th scope="row">مجموع مبلغ المرتجع</th>
   


  </tr>
</thead>

<td >{(accdt.reduce((a,v) =>  a = a + v.chq_value , 0 ))}</td>
<td >{(accdt.reduce((a,v) =>  a = a + v.cash , 0 ))}</td>
<td > {(accdt.reduce((a,v) =>  a = a + v.return_val , 0 ))}</td>



</table>

   
    {accdt.map((i,index)=>{
         if(i.pol_no==null){
           alert("لا يوجد بيانات لهذا الحساب !")
         } 
         else{
     return(
       <div >
        
<hr/>
  <Table responsive="sm" class="table table-light ">
    <thead>
      <tr>
        <th>#</th>
        <th> تاريخ التسجيل</th>
        <th> تاريخ نهاية الوثيقة</th>
        <th> نوع الوثيقة</th>
        <th>اسم الشركة</th>
        <th>رقم الحساب</th>
        <th>اسم الزبون</th>
        <th>رقم الوثيقة</th>
        <th>مبلغ القسط</th>
        <th>قيمة المدفوع نقدي</th>
        <th>مجموع مبلغ الشيكات</th>
        <th>مجموع مبلغ المرتجع</th>
        <th style={{color:'green'}}>متبقي للدفع</th>
        <th style={{color:'green'}}>حالة التسديد</th>
      </tr>
     
    </thead>
    <tbody>
      <tr>
        <td>#</td>
        <td>{moment(i.reg_dt).format("DD/MM/YYYY")}</td>
        <td>{moment(i.end_dt).format("DD/MM/YYYY")}</td>
        <td>{i.doc_type}</td>
        <td>{i.comp_name}</td>
        <td>{i.cust_acc}</td>
        <td>{i.cust_name}</td>
        <td>{i.pol_no}</td>
        <td>{i.total_prem}</td>
        <td>{i.cash}</td>
        <td>{i.chq_value}</td>
        <td>{(a,i) =>  (a = a + i.chq_value , 0 ) || 0}</td>
        <td>{i.total_prem-(i.cash+i.chq_value+i.return_val) || 0}</td>
        
        
        <td>{  (i.total_prem-(i.cash+i.chq_value+i.return_val))==0 &&(i.cash+i.chq_value)!=0 ? <div className='badge badge bg-success text-wrap font-weight-bold'>مقبوض كامل</div>
  : null}
  { (i.total_prem>(i.cash+i.chq_value)) &&(i.cash>0 || i.chq_value>0) ? <div className='badge badge bg-warning text-dark text-wrap font-weight-bold'>مقبوض جزئي</div>
  : null}
  {  i.total_prem-(i.cash+i.chq_value+i.return_val)<0 ? <div className='badge rounded-pill bg-info text-dark font-weight-bold'>القبض اعلى من المبلغ</div>
  : null}
   { (i.total_prem-(i.cash+i.chq_value+i.return_val))==(i.total_prem-i.return_val) ? <div className='badge badge bg-danger text-wrap font-weight-bold'>غير مقبوض</div>
  : null}
   { i.total_prem==0 && (i.cash+i.chq_value==0) ? <div className='badge badge bg-danger text-wrap font-weight-bold'>غير مقبوض</div>
  : null}
   {i.return_val !=null && (i.total_prem===i.return_val) &&(i.cash+i.chq_value)==0 ? <div className='badge badge bg-primary text-wrap font-weight-bold'>مرتجع كامل</div>
  : null}
  </td>
      </tr>
      
     
    </tbody>
  
  </Table>



  

  
</div>

 )} })}

<div >
<div class="card-header text-center">تفاصيل الشيكات</div>
  <table class="table table-striped ">

  <thead >
    
    <tr>
    <th scope="row">رقم الوثيقة</th>
    <th scope="row">البنك</th>
      <th scope="row">رقم الشيك</th>
      <th scope="row">تاريخ الشيك</th>
      <th scope="row">اسم صاحب الشيك</th>
      <th scope="row">اسم الزبون</th>
      <th scope="row">مبلغ الشيك</th>
      <th scope="row">دفعة كاش- شيكل</th>
    </tr>
  </thead>
  
  {accdt.map((i,index)=>{
  
return(
    
      <tbody >
      <tr >
      <td >{i.polno}</td>
      <td >{i.bank}</td>
      <td >{i.chq_no}</td>
      <td >{moment(i.chq_date).format("DD/MM/YYYY")}</td>
      <td scope="row">{i.chq_owner}</td>
      <td scope="row">{i.cust_name}</td>
      <td>{i.chq_value}</td>
      <td > {i.cash} </td>
    </tr>
      
    </tbody>

    )})}
<td  className='table-info'>مجموع مبلغ الشيكات ={(accdt.reduce((a,v) =>  a = a + v.chq_value , 0 ))}</td>
<td  className='table-info'>مجموع مبلغ النقدي= {(accdt.reduce((a,v) =>  a = a + v.cash , 0 ))}</td>


</table>
</div>
           
    </Modal.Body>
    
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
      اغلاق
    </Button>
      <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
        اغلاق
    </Button>
    </Modal.Footer>
  </Modal>
</React.Fragment>

</div>
  
</div>


  )
};
export default AccSearchPage