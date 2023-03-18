import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import '../Style/PolPage.css'
import {Link,useParams,useNavigate} from 'react-router-dom'
import BootstrapTable,{TableHeaderColumn} from "react-bootstrap-table-next";
import {MenuItem,Select,InputLabel} from '@mui/material';
import "bootstrap/dist/css/bootstrap.css"
import { Form, Button,Container,Row,Col, FormGroup, FormControl, ControlLabel,Image,Dropdown,ButtonGroup, Table } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import CashModal from '../Components/Modals/cashModal'
import ChqsModal from '../Components/Modals/chqsModal'
import ReceiptModal from '../Components/Modals/receiptCashModal'
import ReceiptChqsModal from '../Components/Modals/receiptCashModal';

toast.configure()

const url="http://localhost:3000";
const lurl="https://alwafi.thesmartlogic.com";
const baseURL =`${url}/showbyid`;
const AccPage=()=>{
    const {rowid}=useParams();
    const [pol,setPol]=useState([]);
    const [noOfRows, setNoOfRows] = useState(0);
    const [paytype,setPaytype]=useState(true);
    const [pol_no,setPolno]=useState()
    const [pol_year,setPolyear]=useState()
    const [cust_acc,setCustacc]=useState()
    const [cust_name,setCustname]=useState()
    const [reg_dt,setRegdt]=useState()
    const [total_prem,setTotalprem]=useState()
    const [cach,setCash]=useState()
    const [chqno,setChqno]=useState()
    const [chqdt,setChqdt]=useState()
    const [chqname,setChqname]=useState()
    const [chqprem,setChqprem]=useState()
    const[showchqtbl,setshowchqtbl]=useState(false)
    const[chqcount,setChqcount]=useState(0)
    const[bank,setBank]=useState()
    const[status,setstatus]=useState('')
    const [showModal, setShowModal] = useState(false);
    const [showChqsModal, setShowChqsModal] = useState(false);
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const [showReceiptChqModal, setShowReceiptChqModal] = useState(false);


    

              useEffect(() => {
                axios.get(`${baseURL}/${rowid}`).then((response) => {
                setPol(response.data);
                console.log(response.data, "pol")
              
               
                        })}
                        
                        , []);
                        const updateRowstate=()=>{
                          setNoOfRows(noOfRows + 1)
                        }
               const notify = () => toast.success("تمت اضافة القيد المحاسبي بنجاح",{position:toast.POSITION.TOP_RIGHT});
               const notify2 = () => toast.warning("يرجى تعبئة البيانات المطلوبة-مبلغ الكاش",{position:toast.POSITION.TOP_RIGHT});
               const notify3 = () => toast.warning("المبلغ المقبوض اعلى من المطلوب",{position:toast.POSITION.TOP_RIGHT});
               
                  const addavd=()=>{
                  var cashchq=cach+chqprem
                   if(cashchq > total_prem){
                     alert('القسط-'+total_prem+' الكاش -'+ cach +' مبلغ الشيك -'+chqprem)
                    notify2()}
                   
                   else{
                    
                  axios.post(`${url}/addavd`,{pol_no:pol_no,pol_year:pol_year,
                            cust_acc:cust_acc,cust_name:cust_name,reg_dt:reg_dt,total_prem:total_prem,
                            cach:cach,chqno:chqno,chqdt:chqdt,chqname:chqname,chqprem:chqprem,bank:bank,voh_type:"قبض"
                        })
                            .then(()=>{
                              notify()
                              setCash(0)
                              setshowchqtbl(true)
                              setChqcount(chqcount+1)
                               
                            })
                           }   }
                                     
           console.log(pol);             
      return(
        <div className='container'>
        <div className="container" style={{ marginTop: "2rem" }}>
        {pol.map((item, index) => {
       return (
    
    <h1 className="shadow-md text-success  text-center  ">

      <Row className="row1">
        <Form.Group className="container" as={Col}>
        <Form.Label>رقم الوثيقة</Form.Label>
          <Form.Control value={item.pol_no} type="number" readOnly={true}  />
        </Form.Group>
        <Form.Group className="container" as={Col}>
          <Form.Label>سنة الوثيقة</Form.Label>
          <Form.Control type="number" readOnly={true}  value={item.pol_year} />
        </Form.Group>
        <Form.Group className="container" as={Col}>
         <Form.Label>رقم الحساب</Form.Label>
          <Form.Control type="text" readOnly={true} value={item.cust_acc} />
        </Form.Group>
        <Form.Group className="container" as={Col}>
          <Form.Label>اسم العميل</Form.Label>
          <Form.Control type="text" readOnly={true} value={item.cust_name} />
        </Form.Group>

        <Form.Group className="container" as={Col}>
          <Form.Label>تايخ التسجيل</Form.Label>
          <Form.Control type="text" readOnly={true} value={moment(item.start_dt).format("DD/MM/YYYY")} />
        </Form.Group>

        <Form.Group className="container" as={Col}>
          <Form.Label>القسط الاجمالي/شيقل</Form.Label>
          <Form.Control type="number" readOnly={true} onChange={(e) => { setTotalprem(e.target.value) } } value={item.total_prem} />

        </Form.Group>

      </Row>
    </h1>
)
})}
</div>

         <div className="container" style={{ marginTop: "2rem" }}>
         <p style={{color:"green",fontWeight:"bold"}}> * سندات لوثائق محددة برقم وثيقة</p>
          <Button onClick={()=>setShowModal(true)} style={{ padding: '3px', width: 'auto', height: '78px', margin: '20px', fontSize: '1.6rem', fontFamily: 'TypeMates-CeraProBold' }} variant="primary" className="my-3">سند قبض نقدي</Button>
          <Button onClick={()=>setShowChqsModal(true)} style={{ padding: '3px', width: 'auto', height: '78px', margin: '20px', fontSize: '1.6rem', fontFamily: 'TypeMates-CeraProBold' }} variant="primary" className="my-3">سند قبض شيكات</Button>
          <Button onClick={()=>setShowReceiptModal(true)} style={{ padding: '3px', width: 'auto', height: '78px', margin: '20px', fontSize: '1.6rem', fontFamily: 'TypeMates-CeraProBold' }} variant="primary" className="my-3">سند صرف نقدي</Button>
          <Button onClick={()=>setShowReceiptChqModal(true)} style={{ padding: '3px', width: 'auto', height: '78px', margin: '20px', fontSize: '1.6rem', fontFamily: 'TypeMates-CeraProBold' }} variant="primary" className="my-3">سند صرف شيكات</Button>
          <Button style={{ padding: '3px', width: 'auto', height: '78px', margin: '20px', fontSize: '1.6rem', fontFamily: 'TypeMates-CeraProBold' }} variant="primary" className="my-3">سند ارجاع شيكات </Button>
        </div>
       
        <div className="container" style={{ marginTop: "2rem" }}>
        <p style={{color:"green", fontWeight:"bold"}}>*سندات عامة بدون تحديد رقم وثيقة </p>
          <Button onClick={()=>setShowModal(true)} style={{ padding: '3px', width: 'auto', height: '78px', margin: '20px', fontSize: '1.6rem', fontFamily: 'TypeMates-CeraProBold' }} variant="primary" className="my-3">سند قبض نقدي</Button>
          <Button onClick={()=>setShowChqsModal(true)} style={{ padding: '3px', width: 'auto', height: '78px', margin: '20px', fontSize: '1.6rem', fontFamily: 'TypeMates-CeraProBold' }} variant="primary" className="my-3">سند قبض شيكات</Button>
          <Button onClick={()=>setShowReceiptModal(true)} style={{ padding: '3px', width: 'auto', height: '78px', margin: '20px', fontSize: '1.6rem', fontFamily: 'TypeMates-CeraProBold' }} variant="primary" className="my-3">سند صرف نقدي</Button>
          <Button onClick={()=>setShowReceiptChqModal(true)} style={{ padding: '3px', width: 'auto', height: '78px', margin: '20px', fontSize: '1.6rem', fontFamily: 'TypeMates-CeraProBold' }} variant="primary" className="my-3">سند صرف شيكات</Button>
          <Button style={{ padding: '3px', width: 'auto', height: '78px', margin: '20px', fontSize: '1.6rem', fontFamily: 'TypeMates-CeraProBold' }} variant="primary" className="my-3">سند ارجاع شيكات</Button>
        </div>
        {showModal && <CashModal closeModal={setShowModal} polno={pol[0].pol_no} polyear={pol[0].pol_year}/>}
        {showChqsModal && <ChqsModal closeModal={setShowChqsModal} polno={pol[0].pol_no} polyear={pol[0].pol_year}/>}
        {showReceiptModal && <ReceiptModal closeModal={setShowReceiptModal} polno={pol[0].pol_no} polyear={pol[0].pol_year}/>}
        {showReceiptChqModal && <ReceiptChqsModal closeModal={setShowReceiptChqModal} polno={pol[0].pol_no} polyear={pol[0].pol_year}/>}

        </div>
        
            // {pol.map((item, index) => {

            //   return (


            //     <div className="container" style={{ marginTop: "2rem" }}>
            //       <h1 className="shadow-md text-success  text-center  ">

            //         <Row className="row1">
            //           <Form.Group as={Col} controlId="formGridEmail">

            //             <Form.Control value={item.pol_no} type="number" readOnly={true} placeholder="رقم الوثيقة" />
            //           </Form.Group>
            //           <Form.Group as={Col}>

            //             <Form.Control type="number" readOnly={true} placeholder="سنة الوثيقة" value={item.pol_year} />
            //           </Form.Group>
            //           <Form.Group as={Col}>
            //             <Form.Control type="text" readOnly={true} placeholder="رقم حساب الزبون" value={item.cust_acc} />
            //           </Form.Group>
            //           <Form.Group as={Col}>
            //             <Form.Control type="text" readOnly={true} placeholder=" اسم الزبون" value={item.cust_name} />
            //           </Form.Group>

            //           <Form.Group as={Col} controlId="formGridEmail">
            //             <Form.Control type="text" readOnly={true} placeholder=" تاريخ التسجيل" value={moment(item.start_dt).format("DD/MM/YYYY")} />
            //           </Form.Group>

            //           <Form.Group as={Col} controlId="formGridEmail">
            //             <Form.Control type="number" readOnly={true} placeholder=" القسط الاجمالي" onChange={(e) => { setTotalprem(e.target.value) } } value={item.total_prem} />

            //           </Form.Group>

            //         </Row>
            //       </h1>

            //       {/* <Col className="col shadow-lg">
            //         <Form className="form">

            //           <Row className="row1">
            //             <Form.Group as={Col}>
            //               <Form.Control type="number" placeholder="مبلغ الكاش" onChange={(e) => { setCash(e.target.value) } } />
            //             </Form.Group>
            //             <Form.Group as={Col}>
            //               <Button className="addchq " onClick={() => { setNoOfRows(1); setPolno(item.pol_no); setPolyear(item.pol_year); setCustacc(item.cust_acc); setCustname(item.cust_name); setTotalprem(item.total_prem); setRegdt(item.reg_dt) } }> + اضافة شيك</Button>
            //               <Button className="addchq " onClick={() => { setPolno(item.pol_no); setPolyear(item.pol_year); setCustacc(item.cust_acc); setCustname(item.cust_name); setTotalprem(item.total_prem); setRegdt(item.reg_dt) } }> احتساب كاش فقط</Button>

            //             </Form.Group>

            //           </Row>

            //           <table class="table table-bordered table-responsive-md  ">
            //             <thead>
            //               <tr class="table-Active">
            //                 <th>البنك</th>
            //                 <th scope="col">رقم الشيك</th>
            //                 <th scope="col">تاريخ الشيك</th>
            //                 <th scope="col">اسم صاحب الشيك</th>
            //                 <th scope="col">مبلغ الشيك</th>
            //                 <th scope="col"> الاجراءات</th>
            //               </tr>
            //             </thead>

            //             <tbody>

            //               {[...Array(noOfRows)].map((elementInArray, index) => <tr>
            //                 <th><Form.Group as={Col}>

            //                   <Select
            //                     labelId="demo-simple-select-label"
            //                     id="demo-simple-select"
            //                     label="البنك"
            //                     size="small"
            //                     name='bank'
            //                     // value={values.maj_ins}
            //                     onChange={(e) => { setBank(e.target.value) } }
            //                   >
            //                     <MenuItem value={'البنك العربي'}>البنك العربي</MenuItem>
            //                     <MenuItem value={'بنك فلسطين'}>بنك فلسطين</MenuItem>
            //                     <MenuItem value={'بنك الاسكان'}>بنك الاسكان</MenuItem>
            //                     <MenuItem value={'بنك الاردن'}>بنك الاردن</MenuItem>
            //                     <MenuItem value={'بنك الصفا'}>بنك الصفا</MenuItem>
            //                     <MenuItem value={'بنك القدس'}>بنك القدس</MenuItem>
            //                     <MenuItem value={'بنك القاهرة عمان'}>بنك القاهرة عمان</MenuItem>
            //                     <MenuItem value={'بنك الاستثمار'}>بنك الاستثمار</MenuItem>
            //                     <MenuItem value={'بنك الوطني'}>بنك الوطني</MenuItem>
            //                     <MenuItem value={'بنك الاسلامي الفلسطيني'}>الاسلامي الفلسطيني</MenuItem>
            //                     <MenuItem value={'بنك الاسلامي العربي'}>الاسلامي العربي</MenuItem>
            //                   </Select>
            //                 </Form.Group>
            //                 </th>
            //                 <th><Form.Group as={Col}>
            //                   <Form.Control type='number' placeholder="  رقم الشيك" onChange={(e) => { setChqno(e.target.value) } } />
            //                 </Form.Group>
            //                 </th>
            //                 <th> <Form.Group as={Col}>
            //                   <Form.Control type='date' placeholder="  تاريخ الاستحقاق " onChange={(e) => { moment(setChqdt(e.target.value)) } } />
            //                 </Form.Group>
            //                 </th>
            //                 <th> <Form.Group as={Col}>
            //                   <Form.Control type='text' placeholder="  اسم صاحب الشيك " onChange={(e) => { setChqname(e.target.value) } } />
            //                 </Form.Group>
            //                 </th>
            //                 <th><Form.Group as={Col}>
            //                   <Form.Control type='number' placeholder="  مبلغ الشيك" onChange={(e) => { setChqprem(e.target.value) } } />
            //                 </Form.Group>
            //                 </th>

            //                 <th><Form.Group as={Col}>

            //                   <Button type="button" class="btn btn-danger " onClick={() => { setNoOfRows(noOfRows - 1); setChqno = ''; setChqdt = '' } }>حذف </Button>
            //                 </Form.Group>
            //                 </th>
            //               </tr>
            //               )}
            //             </tbody>
            //           </table>

            //           <Button type="Button" class="btn btn-success " onClick={addavd}>حفظ </Button>

            //         </Form>
            //       </Col> */}

            //     </div>
            //   )
            // }
            // )
            // }
    )
}
export default AccPage