import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import {Link,useParams} from 'react-router-dom'
import '../Style/ShowPage.css'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print';
import {FcPrint} from 'react-icons/fc'
import {FaFileExcel} from 'react-icons/fa'
import { Form, Button, Container, Row, Col, FormGroup, FormControl, ControlLabel, Image, Dropdown, ButtonGroup, Card } from "react-bootstrap";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const url="http://localhost:3000";
const lurl="https://alwafi.thesmartlogic.com";
const baseURL =`${url}/showbyid`;

const ShowPage = () => {
    const [post,setPost]=useState([]);
    const {rowid}=useParams();
  



  React.useEffect(() => {
    axios.get(`${baseURL}/${rowid}`).then((response) => {
      setPost(response.data);
     
    });
  }, []);
  console.log(post.id)

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
  content: () => componentRef.current,
     });


    return (
        <>
          {post.map((item,index)=>{
                 
                        return(
                            
                    <>       
            <div className="container"ref={componentRef} >
                
               <h3 className="shadow-sm p-dt  p-4 text-center  "> <div>- المسافر للتأمين -</div> {`وثيقة ${item.pol_no}-${item.pol_year}- حساب-${item.comp_name}`}  </h3> 
           
             
                
                            <Row className="mainrow">
                            <Col className="col shadow-sm">
                                <Form className="form">
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <h5 class="card-title">تفاصيل الوثيقة</h5>
                                                    <p class="card-text">اسم الزبون  :<span className='p-dt'>{item.cust_name}</span>  </p>
                                                    <p class="card-text">رقم الحساب  :<span className='p-dt'>{item.cust_acc}</span> </p>
                                                    <p class="card-text">نوع الحساب  :<span className='p-dt'>{item.acc_type}</span> </p>
                                                    <p class="card-text"> رقم الجوال :<span className='p-dt'> {item.cust_jaw}</span></p>
                                                    <p class="card-text"> رقم الهوية :<span  className='p-dt'>{item.cust_id}</span> </p>
                                                    <p class="card-text"> تاريخ التسجيل   :<span className='p-dt'>{moment(item.reg_dt).format("DD/MM/YYYY")}</span></p>
                                               
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <h5 class="card-title">تفاصيل العين المؤمنة</h5>
                                                    <p class="card-text">نوع العين المؤمن :<span className='p-dt'>{item.car_type}</span></p>
                                                    <p class="card-text">طراز العين المؤمن :<span className='p-dt'>{item.teraz_no}</span></p>
                                                    <p class="card-text">رقم العين المؤمنة :<span className='p-dt'>{item.plate_no}</span></p>
                                                    <p class="card-text">بداية التأمين    :<span className='p-dt'>{moment(item.start_dt).format("DD/MM/YYYY")}</span></p>
                                                    <p class="card-text">نهاية التأمين    :<span className='p-dt'>{moment(item.end_dt).format("DD/MM/YYYY")}</span></p>
                                                    <p class="card-text">قيمة مبلغ التأمين:<span className='p-dt'>{item.sum_insur}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
        
        
        
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <h5 class="card-title">تفاصيل القسط:</h5>
                                                    <div class="card-text"> قيمة القسط  :<span className='p-dt'>{item.prem} </span></div>
                                                    <div class="p-dis">  قيمة الخصم :<span className='p-dis'>{item.discount} </span></div>
                                                    <div class="card-text">القسط النهائي:<span className='p-dt'>{item.total_prem}</span></div>
                                                   
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <h5 class="card-title">بيانات اضافية</h5>
                                                    <div class="card-text"> الشركة المؤمنة  :<span className='p-dt'>{item.ins_comp} </span></div>
                                                    <div class="card-text"> التأمين الرئيسي :<span className='p-dt'>{item.maj_ins} </span></div>
                                                    <div class="card-text">التأمين الفرعي :<span className='p-dt'>{item.min_ins} </span> </div>
                                                    <div class="card-text"> ملاحظات         :<span className='p-dt'>{item.notes} </span> </div>
                                                   
                                                </div>
                                               
                                            </div>
                                        </div>
                                       
                                    </div>
                                   
                                       
                                    
        
        
        
        
                                    <span><span className='p-dis'>*</span>  المبالغ بعملة الشيقل</span>  
                                </Form>
                                
        
                            </Col>
        
        
                        </Row>
                       
                   
                 
           
            
            </div>
            <button className='excle' onClick={handlePrint}><FcPrint/></button>
              <ExcelFile  element={<><button className='excle'><FaFileExcel/></button></>}>
                <ExcelSheet data={post} name="عرض الوثيقة">
                    <ExcelColumn label="pol_no" value="pol_no"/>
                    <ExcelColumn label="pol_year" value="pol_year"/>
                    <ExcelColumn label="ins_comp" value="ins_comp"/>
                    <ExcelColumn label="acc_type" value="acc_type"/>
                    <ExcelColumn label="cust_acc" value="cust_acc"/>
                    <ExcelColumn label="cust_name" value="cust_name"/>
                    <ExcelColumn label="comp_name" value="comp_name"/>
                    <ExcelColumn label="car_type" value="car_type"/>
                    <ExcelColumn label="teraz_no" value="teraz_no"/>
                    <ExcelColumn label="cust_jaw" value="cust_jaw"/>
                    <ExcelColumn label="cover_details" value="cover_details"/>
                </ExcelSheet>
               
            </ExcelFile> 
            </> 
              )})}
        </>
    )
}
export default ShowPage