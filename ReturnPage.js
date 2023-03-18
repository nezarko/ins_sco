import React, {useMemo,useState,useEffect} from 'react'
import axios from "axios";
import moment from 'moment'
import { Modal,Col,Row,Form } from '@themesberg/react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Button } from 'react-bootstrap';
import {FormControl,TextField,FormControlLabel } from '@mui/material';
import {Link,NavLink,useHistory,useParams } from 'react-router-dom'
import '../Style/PolPage2.css'
import { BsEyeFill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import {FcCalculator} from 'react-icons/fc'
import {GrReturn} from 'react-icons/gr'
import {MdOutlineClear} from 'react-icons/md'



import {AiFillDelete} from 'react-icons/ai'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from 'react-toastify';

toast.configure()
const lurl="http://localhost:3001";
const url="https://alwafi.thesmartlogic.com";
const baseURL =`${url}/showbyid`;



const ReturnPage = () => {
  const [data, setData] = useState([]);
  const [pol, setPol] = useState([]);
  const [databyid, setDatabyid] = useState([]);
  const [del,setDel]=useState()
  let history = useHistory ();
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);
  const {rowid}=useParams();
  const [acc_no,setAcc_no]=useState()
  const [return_val,setReturn_val]=useState()
  const [pol_no,setPolno]=useState()
    const [pol_year,setPolyear]=useState()
    const [cust_acc,setCustacc]=useState()
    const [comp_name,setCompname]=useState()
    const [reg_dt,setRegdt]=useState()
    const [total_prem,setTotalprem]=useState()
    const [desc,setDesc]=useState()
    const [retcounter,setRetcounter]=useState(0)
  const notify = () => toast.info("تمت عملية اضافة قيد مرتجع بنجاح",{position:toast.POSITION.TOP_CENTER});
  const notify2 = () => toast.warning("لا يجوز ارجاع اكثر من المبلغ المقبوض!",{position:toast.POSITION.TOP_CENTER});
  


    
useEffect(() => {
  (async () => {
    axios.get(`${baseURL}/${rowid}`).then((response) => {
      setPol(response.data);
      console.log(pol)
    
     
              })
   
   
  })();
}, []);

const returnval=()=>{
 if(return_val>total_prem){
  notify2()
 }
 else{
   axios.post(`${url}/returnavd`,{pol_no:pol_no,pol_year:pol_year,
             cust_acc:cust_acc,comp_name:comp_name,reg_dt:reg_dt,total_prem:total_prem,
             voh_type:"مرتجع",return_val:return_val,description:desc
         })
             .then(()=>{
               notify()
               setRetcounter(retcounter+1)
               alert(`تم رصد قيد مرتجع على الوثيقة بعدد مرات:${retcounter}`)
                
             })
          

}}




  return (
  
    <div className="App">
      {pol.map((item,index)=>{
                
                return(
      <Row className="row1">
        
                      <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>رقم الوثيقة</Form.Label>
                      <Form.Control  size='lg' value={item.pol_no} type="number" readOnly={true}   helperText=" رقم الوثيقة"   variant="outlined"  />
                      </Form.Group>
                      <Form.Group as={Col}  controlId="formGridPassword">
                      <Form.Label>سنة الوثيقة</Form.Label>
                      <Form.Control size='lg' type="number" readOnly={true} placeholder="سنة الوثيقة"   value={item.pol_year}/>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label> رقم الحساب</Form.Label>
                      <Form.Control size='lg' type="text" readOnly={true} placeholder="رقم حساب الزبون"   value={item.cust_acc}/>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>اسم الشركة</Form.Label>
                      <Form.Control size='lg' type="text" readOnly={true} placeholder=" اسم الزبون" value={item.comp_name}/>
                      </Form.Group>
                      
                      <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>تاريخ التسجيل</Form.Label>
                      <Form.Control size='lg' type="text" readOnly={true} placeholder=" تاريخ التسجيل"  value={moment(item.start_dt).format("DD/MM/YYYY")} />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>قسط الوثيقة-شيكل</Form.Label>
                     <Form.Control size='lg' type="number" readOnly={true} placeholder=" القسط الاجمالي" onChange={(e)=>{setTotalprem(e.target.value)}}   value={item.total_prem}/>
               
                     </Form.Group>
                   
                  </Row>
 )})}
 <div style={{ display:'flex',flexFlow:'row'}}>
<Button style={{padding:'3px',width:'80px',height:'78px',margin:'10px',fontSize:'1.2rem',fontFamily:'cursive'}} variant="primary" className="my-3" onClick={() => setShowDefault(true)}>قيد مرتجع</Button>
<Button style={{padding:'3px',width:'80px',height:'78px',margin:'10px',fontSize:'1.2rem',fontFamily:'cursive'}} variant="primary" className="my-3" onClick={() => setShowDefault(true)}>قيد تعديل قسط</Button>

 </div>

<React.Fragment>

{pol.map((item,index)=>{
                
                return(
 <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
   <Modal.Header>
     <Modal.Title className="h5 text-center"> قيد مرتجع على الوثيقة </Modal.Title>
     <Button variant="close" aria-label="Close" onClick={handleClose} />
   </Modal.Header>
   <Modal.Body>
     <Row>
          <FormControl as={Col} id="outlined-basic">
           <TextField size='small'  helperText=" مبلغ المرتجع"   variant="outlined" type="number" onChange={(e)=>{setReturn_val(e.target.value)}}  />
            </FormControl>
            <FormControl as={Col} id="outlined-basic">
           <TextField size='small'  helperText="رقم الحساب"   variant="outlined" type="number" onChange={(e)=>{setAcc_no(e.target.value);setPolno(item.pol_no);setPolyear(item.pol_year);setCustacc(item.cust_acc);setCompname(item.comp_name);setTotalprem(item.total_prem);setRegdt(item.reg_dt)}}  />
            </FormControl>
            </Row>
            <Row>
            <FormControl as={Col} id="outlined-basic">
           <TextField size='larg'  helperText="الوصف"   variant="outlined" type="text" onChange={(e)=>{setDesc(e.target.value)}}  />
            </FormControl>
            </Row>
         
   </Modal.Body>
   <Modal.Footer>
     <Button variant="secondary" onClick={returnval}>
      تنفيذ القيد
   </Button>
     <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
       Close
   </Button>
   </Modal.Footer>
 </Modal>
 )})}
</React.Fragment>

    </div>
    
  );
};

export default ReturnPage