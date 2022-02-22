import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import moment from 'moment'
import {Link,useParams,useNavigate} from 'react-router-dom'
import '../Style/PolPage.css'
//import "bootstrap/dist/css/bootstrap.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Form, Button,Container,Row,Col, FormGroup, FormControl, ControlLabel,Image,Dropdown,ButtonGroup, Card } from "react-bootstrap";

const baseURL = "http://localhost:3001/showbyid";
toast.configure()
const EditPage=()=>{
  let history=useNavigate();
  const [post,setPost]=useState([]);
  const {rowid}=useParams();
  const [pol_no,Setpolno]=useState()
  const [ins_comp,Setinscomp]=useState()
  const [acc_type,Setacctype]=useState()
  const [cust_acc,Setcustacc]=useState()
  const [cust_name,Setcustname]=useState()
  const [maj_ins,Setmajins]=useState()
  const [min_ins,Setminins]=useState()
  const [reg_dt,Setregdt]=useState()
  const [start_dt,Setstartdt]=useState()
  const [end_dt,Setenddt]=useState()
  const [cust_id,Setcustid]=useState()
  const [cust_jaw,Setcustjaw]=useState()
  const [plate_no,Setplateno]=useState()
  const [chas_no,Setchasno]=useState()
  const [sum_insur,Setsuminsur]=useState()
  const [cover_details,Setcoverdetails]=useState()
  const [prem,Setprem]=useState()
  const [feez,Setfeez]=useState()
  const [discount,Setdiscount]=useState()
  const [total_prem,Settotalprem]=useState()
  const [notes,Setnotes]=useState()

   const onInputChange = e => {
    Setinscomp(e.target.value );
  };

  const notify = () => toast.info("تمت عملية تعديل البيانات بنجاح",{position:toast.POSITION.TOP_CENTER});

useEffect(() => {
  axios.get(`${baseURL}/${rowid}`).then((response) => {
    setPost(response.data);
    console.log(cust_name)
   
  });
}, []);
const onSubmit = async e => {
  e.preventDefault();
  await axios.put("http://localhost:3001/update",{ins_comp:ins_comp,cust_name:cust_name,acc_type:acc_type,prem:prem,feez:feez
  ,maj_ins:maj_ins,min_ins,min_ins,reg_dt:reg_dt,start_dt:start_dt,end_dt:end_dt,id:rowid})
  .then(()=>{
    notify()
     
  })
};

    return(
      <>
      {post.map((item,index)=>{
      
        return(
      <Card>
      <div className="container">
        
            <h1 style={{display:"flex",marginTop:"1rem"}} className="shadow-sm  text-center rounded-sm  ">
            <Form.Group   controlId="formGridEmail">
                      
                      <Form.Control  type="number" readOnly = {true} placeholder="رقم الوثيقة" value={item.pol_no} />
                      </Form.Group>

                      <Form.Group  controlId="formGridPassword">
                      
                      <Form.Control type="number" readOnly = {true} placeholder="سنة الوثيقة" value={item.pol_year} />
                      </Form.Group>
                      

                      <Form.Group  controlId="formGridPassword">
                      <Form.Control type="number" readOnly = {true}  placeholder="رقم حساب الزبون" value={item.cust_acc} />
                      </Form.Group>
            </h1>
            <Row className="mainrow">
              <Col className="col shadow-sm">
              <Form className="form" onSubmit={e => onSubmit(e)}>
              <Row className="row1">
              <Form.Group id="frameworks" as={Col} >
                       <Form.Select name="ins_comp" defaultValue={item.ins_comp} onChange={e => onInputChange(e)}>
                      
                       <option> فلسطين للتأمين </option>
                       <option> التكافل للتأمين </option>
                       <option> ترست للتأمين </option>
                       <option> الوطنية للتأمين </option>
                       <option> المشرق للتأمين </option>
                       <option> تمكين للتأمين </option>
                       <option> العالمية للتأمين </option>
                       <option> الأهلية للتأمين </option>
                       </Form.Select>
                         </Form.Group>

                      <Form.Group id="frameworks" as={Col} >
                     <Form.Select name="acc_type" defaultValue={item.acc_type} onChange={(e)=>{Setacctype(e.target.value)}}>
                     
                     <option>أفراد</option>
                     <option>شركات</option>
                     </Form.Select>
                       </Form.Group>
                      <Form.Group as={Col} controlId="formGridPassword">
                      
                      <Form.Control  name="cust_name" defaultValue={item.cust_name} onChange={e => { Setcustname( e.target.value) }} type="text"  placeholder="اسم الزبون"  />
                      </Form.Group>
                      <Form.Group id="frameworks" as={Col} >
                    
                     <Form.Select   name="maj_ins"   onChange={(e)=>{Setmajins(e.target.value)}} defaultValue={item.maj_ins}>
                     
                     <option>سيارات</option>
                     <option>عامة</option>
                     </Form.Select>
                   </Form.Group>
                    <Form.Group id="frameworks" as={Col} >
                   
                     <Form.Select  name="min_ins" onChange={(e)=>{Setminins(e.target.value)}}  defaultValue={item.min_ins}>
                    
                     <option>شامل</option>
                     <option>طرف ثالث</option>
                     <option>موحد</option>
                     <option>حريق</option>
                     <option>هندسي</option>
                     <option>عامة</option>
                     </Form.Select>
                   </Form.Group>
                  </Row>

                  <Row className="row2">
                

                  <Form.Group as={Col} controlId="formGridEmail">
                      <label for="exampleInputEmail1">تاريخ التسجيل </label>
                      <Form.Control  onChange={(e)=>{Setregdt(e.target.value)}} type="date" placeholder=" تاريخ التسجيل" defaultValue={moment(item.reg_dt).format("DD/MM/YYYY")} />
                    
                      </Form.Group>

                      

                      <Form.Group as={Col} controlId="formGridEmail">
                      <label for="exampleInputEmail1">بداية التأمين </label>
                      <Form.Control  onChange={(e)=>{Setstartdt(e.target.value)}} type="date"  placeholder="بداية التأمين"  defaultValue={moment(item.reg_dt).format("DD/MM/YYYY")}/>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridPassword">
                      <label for="exampleInputEmail1"> نهاية التأمين</label>
                      <Form.Control  onChange={(e)=>{Setenddt(e.target.value)}} type="date"  placeholder=" نهاية التأمين" defaultValue={moment(item.reg_dt).format("DD/MM/YYYY")} />
                      </Form.Group>
                      
                  </Row>

                  <Row className="row4">
                      <Form.Group as={Col} controlId="formGridEmail">
                      
                      <Form.Control  onChange={(e)=>{Setcustid(e.target.value)}} type="number"  placeholder="  هوية الزبون" defaultValue={item.cust_id} />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Control  onChange={(e)=>{Setcustjaw(e.target.value)}} type="number"  placeholder="رقم جوال الزبون"  defaultValue={item.cust_jaw}/>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Control  onChange={(e)=>{Setplateno(e.target.value)}} type="number"  placeholder="رقم اللوحة/ الشاصي" defaultValue={item.plate_no} />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Control onChange={(e)=>{Setchasno(e.target.value)}} type="text"  placeholder="رقم الشاصي" defaultValue={item.chas_no} />
                        </Form.Group>
                      <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Control  onChange={(e)=>{Settotalprem(e.target.value)}} type="number"  placeholder="مبلغ التأمين الاجمالي" defaultValue={item.sum_insur}/>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Control  onChange={(e)=>{Setcoverdetails(e.target.value)}} type="text"  placeholder="تفاصيل العين المؤمنة" defaultValue={item.cover_details} />
                      </Form.Group>
                    
                  </Row>
                  <Row className="row">
                      
                  <Form.Group as={Col} controlId="formGridEmail">
                    
                    <Form.Control onChange={(e)=>{Setprem(e.target.value)}}  type="number" placeholder="القسط" defaultValue={item.prem}  />
                    
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                    
                    <Form.Control  onChange={(e)=>{Setfeez(e.target.value)}} type="number" placeholder="الرسوم" defaultValue={item.feez} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                   
                    <Form.Control  onChange={(e)=>{Setdiscount(e.target.value)}} type="number" placeholder=" قيمة الخصم" defaultValue={item.discount} />
                    </Form.Group>
               
                    <Form.Group as={Col} controlId="formGridEmail">
                   
                    <Form.Control  onChange={(e)=>{Settotalprem(e.target.value)}}  type="number" placeholder=" القسط الاجمالي"  defaultValue={item.total_prem}/>
                    </Form.Group>
                  </Row>
                  <Row>
                  <Form.Group as={Col} controlId="formGridEmail">
                   
                   <Form.Control  onChange={(e)=>{Setnotes(e.target.value)}}  type="text" placeholder=" اضافة ملاحظات"  defaultValue={item.notes}/>
                   </Form.Group>
                  </Row>
                  <Row as={Row}>
                  <ButtonGroup>
                      <Button  type='submit' className='button8'>تعديل</Button>
                      </ButtonGroup>
                      </Row>
                  </Form>
                  
                  
              </Col>
              
              
             
          </Row>
      </div>
      </Card>
      )})}
     
      </>
    )
}
export default EditPage