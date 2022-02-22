import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import '../Style/PolPage.css'
import {Link,useParams,useNavigate} from 'react-router-dom'
import BootstrapTable,{TableHeaderColumn} from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.css"
import { Form, Button,Container,Row,Col, FormGroup, FormControl, ControlLabel,Image,Dropdown,ButtonGroup, Table } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
toast.configure()


const baseURL = "http://localhost:3001/showbyid";
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
    

              useEffect(() => {
                axios.get(`${baseURL}/${rowid}`).then((response) => {
                setPol(response.data);
                console.log(response.data)
              
               
                        })}
                        
                        , []);
                        const updateRowstate=()=>{
                          setNoOfRows(noOfRows + 1)
                        }
               const notify = () => toast.success("تمت اضافة القيد المحاسبي بنجاح",{position:toast.POSITION.TOP_RIGHT});

                  const addavd=()=>{
                   
                  axios.post("http://localhost:3001/addavd",{pol_no:pol_no,pol_year:pol_year,
                            cust_acc:cust_acc,cust_name:cust_name,reg_dt:reg_dt,total_prem:total_prem,
                            cach:cach,chqno:chqno,chqdt:chqdt,chqname:chqname,chqprem:chqprem
                        })
                            .then(()=>{
                              notify()
                              setCash(0)
                              setshowchqtbl(true)
                              setChqcount(chqcount+1)
                               
                            })
                           }   
                                     
                        
      return(
          <>
           {pol.map((item,index)=>{
                
             return(
                 
         <div className="container" style={{marginTop:"2rem"}}>
         <h1  className="shadow-md text-success  text-center  ">
          
          <Row className="row1">
                      <Form.Group as={Col} controlId="formGridEmail">
                     
                      <Form.Control  value={item.pol_no} type="number" readOnly={true}  placeholder="رقم الوثيقة" />
                      </Form.Group>
                      <Form.Group as={Col}  controlId="formGridPassword">
                     
                      <Form.Control type="number" readOnly={true} placeholder="سنة الوثيقة"   value={item.pol_year}/>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Control type="text" readOnly={true} placeholder="رقم حساب الزبون"   value={item.cust_acc}/>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Control type="text" readOnly={true} placeholder=" اسم الزبون" value={item.cust_name}/>
                      </Form.Group>
                      
                      <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Control type="text" readOnly={true} placeholder=" تاريخ التسجيل"  value={moment(item.start_dt).format("DD/MM/YYYY")} />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridEmail">
                     <Form.Control type="number" readOnly={true} placeholder=" القسط الاجمالي" onChange={(e)=>{setTotalprem(e.target.value)}}   value={item.total_prem}/>
                     </Form.Group>
                  </Row>
                  </h1>
            
                  <Col className="col shadow-lg">
                  <Form className="form">
              
                  <Row className="row1">
                      <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Control type="number" placeholder="مبلغ الكاش" onChange={(e)=>{setCash(e.target.value)}} />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridPassword">
                        <Button  className="addchq " onClick={() => {setNoOfRows(noOfRows + 1);setPolno(item.pol_no);setPolyear(item.pol_year);setCustacc(item.cust_acc);setCustname(item.cust_name);setTotalprem(item.total_prem);setRegdt(item.reg_dt)}}> + اضافة شيك</Button> 
                      </Form.Group>
                  </Row>

                  <table class="table table-bordered table-responsive-md  ">
                  <thead>
                            <tr class="table-Active">
                            <th scope="col">رقم الشيك</th>
                            <th scope="col">تاريخ الشيك</th>
                            <th scope="col">اسم صاحب الشيك</th>
                            <th scope="col">مبلغ الشيك</th>
                            <th scope="col"> الاجراءات</th>
                            </tr>
                        </thead>
                  
                        <tbody>

                  {[...Array(noOfRows)].map((elementInArray, index) => 
                  
                  <tr>
                  <th ><Form.Group as={Col} controlId="formGridPassword">
                      <Form.Control type='number'   placeholder="  رقم الشيك" onChange={(e)=>{setChqno(e.target.value)}} />
                      </Form.Group>
                      </th>
                      <th > <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Control type='date'   placeholder="  تاريخ الاستحقاق " onChange={(e)=>{moment(setChqdt(e.target.value))}}/>
                      </Form.Group>
                      </th>
                      <th > <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Control type='text'   placeholder="  اسم صاحب الشيك " onChange={(e)=>{setChqname(e.target.value)}}/>
                      </Form.Group>
                      </th>
                      <th ><Form.Group as={Col} controlId="formGridPassword">
                      <Form.Control  type='number'   placeholder="  مبلغ الشيك"onChange={(e)=>{setChqprem(e.target.value)}} />
                      </Form.Group>
                      </th>

                      <th ><Form.Group as={Col} controlId="formGridPassword">
                      <Button type="Button" class="btn btn-success " onClick={addavd}>حفظ </Button>
                      <Button type="button" class="btn btn-danger " onClick={() => setNoOfRows(noOfRows -1)}>حذف </Button>
                      </Form.Group>
                      </th>
                      </tr>
                  )}
                   </tbody>
                  </table>
                 
                   
                
                  </Form>
              </Col>
         
      </div>
  )})}
      </>
    )
}
export default AccPage