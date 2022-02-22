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

const baseURL = "http://localhost:3001/showbyid";

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
                            
            <div className="container"ref={componentRef} >
                
               <h3 className="shadow-sm p-dt  p-3 text-center  ">{`وثيقة ${item.pol_no}-${item.pol_year}`} </h3> 
              <button className='excle' onClick={handlePrint}><FcPrint/></button>
              <ExcelFile  element={<><button className='excle'><FaFileExcel/></button></>}>
                <ExcelSheet data={post} name="الانتاج الكلي">
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
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <h5 class="card-title">تفاصيل العين المؤمنة</h5>
                                                    <p class="card-text">نوع العين المؤمن :<span className='p-dt'>{item.cover_details}</span></p>
                                                    <p class="card-text"> تاريخ التسجيل   :<span className='p-dt'>{moment(item.reg_dt).format("DD/MM/YYYY")}</span></p>
                                                    <p class="card-text">بداية التأمين    :<span className='p-dt'>{moment(item.start_dt).format("DD/MM/YYYY")}</span></p>
                                                    <p class="card-text">نهاية التأمين    :<span className='p-dt'>{moment(item.end_dt).format("DD/MM/YYYY")}</span></p>
                                                    <p class="card-text">وصف العين المؤمنة:<span className='p-dt'>{item.notes}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
        
        
        
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <h5 class="card-title">تفاصيل القسط:</h5>
                                                    <div class="card-text">قيمة القسط  :<span className='p-dt'>{item.prem} </span>شيكل</div>
                                                    <div class="card-text">قيمة الخصم :<span className='p-dt'>{item.discount} </span>شيكل</div>
                                                    <div class="card-text">القسط النهائي :<span className='p-dt'>{item.total_prem} </span> شيكل</div>
                                                   
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
                                                   
                                                </div>
                                            </div>
                                        </div>
                                      
                                    </div>
                                   
                                       
                                    
        
        
        
        
        
                                </Form>
        
        
                            </Col>
        
        
                        </Row>
                       
                   
                     
            </div>
              )})}
        </>
    )
}
export default ShowPage