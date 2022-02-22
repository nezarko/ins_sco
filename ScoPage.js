import React, { useState ,useRef} from 'react'
import axios from 'axios'
import '../Style/ScoPage.css'
//import "bootstrap/dist/css/bootstrap.css"
import { Form,Container,Row,Col, FormGroup, ControlLabel,Image,Dropdown,ButtonGroup } from "react-bootstrap";
import { FaBullseye } from 'react-icons/fa';
import {FormControl,MenuItem,Select,TextField,InputLabel,Button} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReactToPrint } from 'react-to-print';
import { useForm } from "react-hook-form";


toast.configure()
const ScoPage=(props)=>{
    const [cover,setCover]=useState()
    const [pol_no,Setpolno]=useState(1)
    const [pol_year,Setpolyear]=useState(2022)
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
    
    const notify = () => toast.success("تمت اضافة الوثيقة بنجاح",{position:toast.POSITION.TOP_CENTER});
    const notify2 = () => toast.warning("يجب تعبئة جميع الحقول",{position:toast.POSITION.TOP_CENTER});
    const addemp=()=>{
      ins_comp != null || min_ins != null ?
        axios.post("http://localhost:3001/create",{pol_no:pol_no,pol_year:pol_year,ins_comp:ins_comp,acc_type:acc_type,
        cust_acc:cust_acc,cust_name:cust_name,maj_ins:maj_ins,min_ins:min_ins,reg_dt:reg_dt,start_dt:start_dt,
        end_dt:end_dt,cust_id:cust_id,cust_jaw:cust_jaw,plate_no:plate_no,chas_no:chas_no,sum_insur:sum_insur,
        cover_details:cover_details,prem:prem,feez:feez,discount:discount,total_prem:total_prem,notes:notes
    })
        .then(()=>{
          notify()
        
           
        })
        : notify2()
       }

       const componentRef = useRef();
       const handlePrint = useReactToPrint({
       content: () => componentRef.current,
          });

          const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onvaldate = (data,e) => {
    console.log(data);
    //reset();
    e.preventDefault();
  };
 
   
    return(
        <>
      
         

        <div className="container" >
        
              <h1 style={{marginTop:"2rem",color:"#004960"}} className="shadow-sm  text-center   ">اضافة وثيقة جديدة </h1>
              <Row className="mainrow">
                <Col className="col shadow-sm">
                <Form className="form" >
                <Row className="row1">
                       
                        <FormControl  id="outlined-basic" as={Col} controlId="formGridPassword">
                        <TextField  size="small"  variant="outlined" type="number" InputProps={{ readOnly: true,shrink: true }}label="سنة الوثيقة"  value={2022}/>
                        </FormControl>
                        <FormControl id="outlined-basic" as={Col}>
                        <InputLabel id="demo-simple-select-label"> شركة التأمين</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                         label="شركة التأمين"
                         size="small"
                          onChange={(e)=>{Setinscomp(e.target.value)}}
                        >
                          <MenuItem value={'فلسطين للتأمين'}>فلسطين للتأمين</MenuItem>
                          <MenuItem value={'التكافل للتأمين'}>التكافل للتأمين</MenuItem>
                          <MenuItem value={'ترست للتأمين'}>ترست للتأمين</MenuItem>
                          <MenuItem value={'الوطنية للتأمين'}>الوطنية للتأمين</MenuItem>
                          <MenuItem value={'المشرق للتأمين'}>المشرق للتأمين</MenuItem>
                          <MenuItem value={'تمكين للتأمين<'}>تمكين للتأمين</MenuItem>
                          <MenuItem value={'العالمية للتأمين'}>العالمية للتأمين</MenuItem>
                          <MenuItem value={'الأهلية للتأمين'}>الأهلية للتأمين</MenuItem>
                          </Select>
                      </FormControl>
                         
                         <FormControl id="outlined-basic" as={Col}>
                         <InputLabel id="demo-simple-select-label">نوع الحساب </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                         label="نوع الحساب"
                         size="small"
                          onChange={(e)=>{Setacctype(e.target.value)}}
                        >
                          <MenuItem value={'أفراد'}>أفراد</MenuItem>
                          <MenuItem value={'شركات'}>شركات</MenuItem>
                          </Select>
                      </FormControl>
                         
                        <FormControl as={Col} id="outlined-basic">
                        <TextField  size="small" variant="outlined" type="number" onChange={(e)=>{Setcustacc(e.target.value)}}  label="رقم حساب الزبون"
                         
                        />
                    
                    
                        </FormControl>
                         <FormControl  as={Col} id="outlined-basic">
                         <TextField size="small" variant="outlined" type="text" onChange={(e)=>{Setcustname(e.target.value)}}  label="اسم الزبون" />
                        </FormControl>
                    </Row>

                    <Row className="row2">
                        <FormControl id="outlined-basic" as={Col}>
                        <InputLabel id="demo-simple-select-label">التأمين الرئيسي</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                         label="التأمين الرئيسي"
                         size="small"
                          onChange={(e)=>{Setmajins(e.target.value)}}
                        >
                          <MenuItem value={'سيارات'}>سيارات</MenuItem>
                          <MenuItem value={'عامة'}>عامة</MenuItem>
                          </Select>
                      </FormControl>

                      <FormControl id="outlined-basic" as={Col}>
                        <InputLabel id="demo-simple-select-label">التأمين الفرعي</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                         label="التأمين الفرعي"
                         size="small"
                          onChange={(e)=>{Setminins(e.target.value)}}
                        >
                          <MenuItem value={'شامل'}>شامل</MenuItem>
                          <MenuItem value={'طرف ثالث'}>طرف ثالث</MenuItem>
                          <MenuItem value={'موحد'}>موحد</MenuItem>
                          <MenuItem value={'عامة'}>عامة</MenuItem>
                          <MenuItem value={'حريق'}>حريق</MenuItem>
                          <MenuItem value={'هندسي'}>هندسي</MenuItem>
                          <MenuItem value={'عمال'}>عمال</MenuItem>
                          </Select>
                      </FormControl>

                      
                     <FormControl as={Col} id="outlined-basic">
                        <TextField size="small" helperText=" تاريخ التسجيل" variant="outlined" onChange={(e)=>{Setregdt(e.target.value)}} type="date" label=" تاريخ التسجيل"  />
                       </FormControl>
                        <FormControl as={Col} id="outlined-basic">
                       <TextField size="small"  helperText="بداية التامين" variant="outlined" onChange={(e)=>{Setstartdt(e.target.value)}} type="date"  label="بداية التأمين" />
                        </FormControl>
                        <FormControl as={Col} id="outlined-basic">
                        <TextField size="small" helperText="نهاية التأمين" variant="outlined" onChange={(e)=>{Setenddt(e.target.value)}} type="date"  label=" نهاية التأمين" />
                        </FormControl>
                        
                    </Row>

                    <Row className="row4">
                        <FormControl as={Col} id="outlined-basic">
                        <TextField size="small" variant="outlined" onChange={(e)=>{Setcustid(e.target.value)}} type="number"  label="  هوية الزبون" />
                        </FormControl>

                        <FormControl as={Col} id="outlined-basic">
                        <TextField size="small" variant="outlined" onChange={(e)=>{Setcustjaw(e.target.value)}} type="number"  label="رقم جوال الزبون" />
                        </FormControl>
                        <FormControl as={Col} id="outlined-basic">
                        <TextField size="small" variant="outlined" onChange={(e)=>{Setplateno(e.target.value)}} type="number"  label="رقم اللوحة" />
                        </FormControl>
                        <FormControl as={Col} id="outlined-basic">
                        <TextField size="small"  variant="outlined" onChange={(e)=>{Setchasno(e.target.value)}} type="text"  label="رقم الشاصي" />
                        </FormControl>
                        <FormControl as={Col} id="outlined-basic">
                        <TextField size="small" variant="outlined"  onChange={(e)=>{Setsuminsur(e.target.value)}} type="number"  label="مبلغ التأمين الاجمالي" />
                        </FormControl>
                                              
                    </Row>
                    <Row className="row">
                    <FormControl as={Col} id="outlined-basic">
                        <TextField size="small"  variant="outlined" onChange={(e)=>{Setcoverdetails(e.target.value)}} type="text"  label="تفاصيل العين المؤمنة" />
                        </FormControl>
                    <FormControl as={Col} id="outlined-basic">
                      <TextField size="small" variant="outlined" onChange={(e)=>{Setprem(e.target.value)}} type="number" label="القسط" />
                      </FormControl>
                      <FormControl as={Col} id="outlined-basic">
                      <TextField size="small" variant="outlined" onChange={(e)=>{Setfeez(e.target.value)}} type="number" label="الرسوم" />
                      </FormControl>

                      <FormControl as={Col} id="outlined-basic">
                      <TextField size="small" variant="outlined" onChange={(e)=>{Setdiscount(e.target.value)}} type="number" label=" قيمة الخصم" />
                      </FormControl>
                 
                      <FormControl as={Col} id="outlined-basic">
                      <TextField size="small" size="small" variant="outlined" onChange={(e)=>{Settotalprem(e.target.value)}}   type="number" label=" القسط الاجمالي" />
                      </FormControl>
                    </Row>
                    <Row>
                    <FormControl as={Col}  id="outlined-notes">
                     <TextField size="small" variant="outlined" onChange={(e)=>{Setnotes(e.target.value)}}  type="text" label=" اضافة ملاحظات" />
                     </FormControl>
                    </Row>
                    <Button  onClick={addemp} variant="contained" endIcon={<AddCircleIcon />}></Button>
                   
                    </Form>
                    
                   
                 </Col>
                
                
               
            </Row>
        </div>
        </>
    )
}
export default ScoPage