import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import moment from 'moment'
import {Link,useParams,useHistory } from 'react-router-dom'
import '../Style/PolPage.css'
//import "bootstrap/dist/css/bootstrap.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {FormControl,MenuItem,Select,InputLabel} from '@mui/material';
import { Form, Button,Container,Row,Col, FormGroup, ControlLabel,Image,Dropdown,ButtonGroup, Card } from "react-bootstrap";
const url="http://localhost:3000";
const lurl="https://alwafi.thesmartlogic.com";
const baseURL = `${url}/showbyid`;
toast.configure()

const EditPage=()=>{
  let history=useHistory ();
  const [post,setPost]=useState([]);
  const {rowid}=useParams();
  const [pol_no,Setpolno]=useState()
  const [pol_year,Setpolyear]=useState(2023)
  const [ins_comp,Setinscomp]=useState()
 const [acc_type,Setacctype]=useState()
 const [comp_name,Setcompname]=useState()
  const [cust_acc,Setcustacc]=useState()
  const [cust_name,Setcustname]=useState()
  const [teraz_no,Setterazno]=useState()
  const [prod_year,Setprodyear]=useState()
 const [maj_ins,Setmajins]=useState()
  const [min_ins,Setminins]=useState()
 const [reg_dt,Setregdt]=useState()
  const [start_dt,Setstartdt]=useState()
  const [end_dt,Setenddt]=useState()
 const [cust_id,Setcustid]=useState()
  const [cust_jaw,Setcustjaw]=useState()
  const [car_type,Setcartype]=useState()
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
    post[0].pol_no && Setpolno(post[0].pol_no);
    post[0].ins_comp && Setinscomp(post[0].ins_comp);
    post[0].acc_type && Setacctype(post[0].acc_type);
    post[0].comp_name && Setcompname(post[0].comp_name);
    post[0].cust_name && Setcustname(post[0].cust_name);
    post[0].teraz_no && Setterazno(post[0].teraz_no);
    post[0].prod_year && Setprodyear(post[0].prod_year);
    Setmajins(post[0].maj_ins && post[0].maj_ins);
    Setminins(post[0].min_ins && post[0].min_ins);
    Setregdt(post[0].reg_dt && post[0].reg_dt);
    Setstartdt(post[0].start_dt && post[0].start_dt);
    Setenddt(post[0].end_dt && post[0].end_dt);
    Setcustid(post[0].cust_id && post[0].cust_id);
    Setcustjaw(post[0].cust_jaw && post[0].cust_jaw);
    Setcartype(post[0].car_type && post[0].car_type);
    Setplateno(post[0].plate_no && post[0].plate_no);
    Setchasno(post[0].chas_no && post[0].chas_no);
    Setsuminsur(post[0].sum_insur && post[0].sum_insur);
    Setprem(post[0].prem && post[0].prem);
    Setdiscount(post[0].discount && post[0].discount);
    Settotalprem(post[0].total_prem && post[0].total_prem);
    Setnotes(post[0].notes && post[0].notes);
    Setcoverdetails(post[0].cover_details && post[0].cover_details);
  

  });
}, [post, rowid]);
const onSubmit = async e => {
  e.preventDefault();
  await axios.put(`${url}/update`,{pol_no:pol_no,pol_year:pol_year,ins_comp:ins_comp,acc_type:acc_type,
    comp_name:comp_name,cust_name:cust_name,maj_ins:maj_ins,min_ins:min_ins,reg_dt:reg_dt,start_dt:start_dt,
    end_dt:end_dt,cust_id:cust_id,cust_jaw:cust_jaw,car_type:car_type,teraz_no:teraz_no,prod_year:prod_year,plate_no:plate_no,chas_no:chas_no,sum_insur:sum_insur,
    prem:prem,discount:discount,total_prem:total_prem,notes:notes,id:rowid
})
  .then(()=>{
    notify()
     
  })
};
const { formState: { errors } } = useForm();
    return(
      <>
      {post.map((item,index)=>{
      
        return(
          
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
              {/* <Form className="form" onSubmit={e => onSubmit(e)}> */}
              <ValidatorForm className="form" onSubmit={e => onSubmit(e)} 
               onError={errors => console.log(errors)}>

              <Row className="row1">
                   
                   <FormControl  id="outlined-basic" as={Col} controlId="formGridPassword">
                   <TextValidator name='pol_year' size="small"  variant="outlined" type="number" InputProps={{ readOnly: true,shrink: true }}label="سنة الوثيقة"  value={2022}/>
                   </FormControl>
                   <FormControl  id="outlined-basic" as={Col} controlId="formGridPassword"
                     defaultValue={item.pol_no}
                     onChange={(e)=>Setpolno(e.target.value)}
                     validators={['required']}
                     errorMessages={['حقل مطلوب']}
                     >
                   </FormControl>

                   <FormControl id="outlined-basic" as={Col}>
                   <InputLabel id="demo-simple-select-label"> شركة التأمين</InputLabel>
                   <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                    label="شركة التأمين"
                    size="small"
                    name="ins_comp"
                    value={item.ins_comp}
                    onChange={(e)=>Setinscomp(e.target.value)}
                     //ref={register}
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
                    name='acc_type'
                    value={item.acc_type}
                    onChange={(e)=>{Setacctype(e.target.value)}}
                   >
                     <MenuItem value={'أفراد'}>أفراد</MenuItem>
                     <MenuItem value={'شركات'}>شركات</MenuItem>
                     </Select>
                 </FormControl>
                    
                   <FormControl as={Col} id="outlined-basic">
                   <TextValidator size="small" variant="outlined" name='cust_acc' type="number"   label="رقم حساب الشركة"
                    value={item.cust_acc}
                    // onChange={(e)=>Setcustacc(e.target.value)}
                    validators={['required']}
                    errorMessages={['حقل مطلوب']}
                
                   />
                    </FormControl>
                    <FormControl  as={Col} id="outlined-basic">
                    <TextValidator name='comp_name' size="small" variant="outlined" type="text"   label="اسم الشركة" 
                     value={item.comp_name}
                     onChange={(e)=>{Setcompname(e.target.value)}}
                     validators={['required']}
                     errorMessages={['حقل مطلوب']}
                    
                       />
                   
                   </FormControl>
                    <FormControl  as={Col} id="outlined-basic">
                    <TextValidator name='cust_name' size="small" variant="outlined" type="text"   label="اسم الزبون" 
                     value={item.cust_name}
                     onChange={(e)=>{Setcustname(e.target.value)}}
                     validators={['required']}
                     errorMessages={['حقل مطلوب']}
                    
                       />
                      
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
                     name='maj_ins'
                     value={item.maj_ins}
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
                      name='min_ins'
                      value={item.min_ins}
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
                    <TextValidator name='reg_dt' size="small" helperText=" تاريخ التسجيل" variant="outlined" type="date" 
                     value={item.reg_dt}
                     onChange={(e)=>{Setregdt(e.target.value)}}
                     validators={['required']}
                     errorMessages={['حقل مطلوب']}
                    />
                   </FormControl>
                    <FormControl  as={Col} id="outlined-basic">
                   <TextValidator  name='start_dt' size="small"  helperText="بداية التامين" variant="outlined" type="date"  
                    value={item.start_dt}
                    onChange={(e)=>{Setstartdt(e.target.value)}}
                    validators={['required']}
                     errorMessages={['حقل مطلوب']}
                   />
                    </FormControl>
                    <FormControl  as={Col} id="outlined-basic">
                    <TextValidator name='end_dt' size="small" helperText="نهاية التأمين" variant="outlined" type="date"  
                     value={item.end_dt}
                     onChange={(e)=>{Setenddt(e.target.value)}}
                     validators={['required']}
                     errorMessages={['حقل مطلوب']}
                    />
                    </FormControl>
                    <FormControl as={Col} id="outlined-basic">
                    <TextValidator name='cust_id' size="small" variant="outlined" type="number"  label="  هوية الزبون"
                     value={item.cust_id}
                     onChange={(e)=>{Setcustid(e.target.value)}}
                     validators={['required']}
                     errorMessages={['حقل مطلوب']}
                    />
                    </FormControl>

                    <FormControl as={Col} id="outlined-basic">
                    <TextValidator  name='cust_jaw' size="small"  variant="outlined" type="number"  label="رقم جوال الزبون" 
                     value={item.cust_jaw}
                     onChange={(e)=>{Setcustjaw(e.target.value)}}
                     validators={['required','isNumber']}
                     errorMessages={['حقل مطلوب','ادخل رقم فقط']}
                    />

                    </FormControl>
                    
                </Row>
                <Row className="row4">
                  

                  <FormControl id="outlined-basic" as={Col}>
                   <InputLabel id="demo-simple-select-label">نوع السيارة </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                   label="نوع السيارة"
                   size="small"
                   name='car_type'
                   value={item.car_type}
                   onChange={(e)=>{Setcartype(e.target.value)}}
                  >
                    <MenuItem value="">الكل</MenuItem>
                  <MenuItem value="Dodge">Dodge</MenuItem>
                  <MenuItem value="أفيكو">أفيكو</MenuItem>
                  <MenuItem value="ألفا روميو">الفا روميو</MenuItem>
                  <MenuItem value="أوبل">اوبل</MenuItem>
                  <MenuItem value="أودي">اودي</MenuItem>
                  <MenuItem value="ايسوزو">ايسوزو</MenuItem>
                  <MenuItem value="باص">باص</MenuItem>
                  <MenuItem value="بي ام دبليو">بي ام دبليو</MenuItem>
                  <MenuItem value="بيجو">بيجو</MenuItem>
                  <MenuItem value="تويوتا">تويوتا</MenuItem>
                  <MenuItem value="جاجوار">جاجوار</MenuItem>
                  <MenuItem value="جي ام سي">جي ام سي </MenuItem>
                  <MenuItem value="جيب">جييب</MenuItem>
                  <MenuItem value="داتشيا">داتشيا</MenuItem>
                  <MenuItem value="داف">داف</MenuItem>
                  <MenuItem value="دايو">دايو</MenuItem>
                  <MenuItem value="دراجة نارية">دراجة نارية</MenuItem>
                  <MenuItem value="ديهاتسو">ديهاتسو</MenuItem>
                  <MenuItem value="روفر">روفر</MenuItem>
                  <MenuItem value="رينو">رينو</MenuItem>
                  <MenuItem value="سانغ يونق">سانغ يونغ</MenuItem>
                  <MenuItem value="ستروين">ستروين</MenuItem>
                  <MenuItem value="سكانيا">سكانيا</MenuItem>
                  <MenuItem value="سكودا">سكودا</MenuItem>
                  <MenuItem value="سوبارو">سوبارو</MenuItem>
                  <MenuItem value="سوزوكي">سوزوكي</MenuItem>
                  <MenuItem value="سيت">سيت</MenuItem>
                  <MenuItem value="شاحنة">شاحنة</MenuItem>
                  <MenuItem value="شفروليه">شفروليه</MenuItem>
                  <MenuItem value="فورد">فورد</MenuItem>
                  <MenuItem value="فولفو">فولفو</MenuItem>
                  <MenuItem value="فولكسفاجن">فولكسفاجن</MenuItem>
                  <MenuItem value="فيات">فيات</MenuItem>
                  <MenuItem value="كاديلاك">كاديلاك</MenuItem>
                  <MenuItem value="كرايسلر">كرايسلر</MenuItem>
                  <MenuItem value="كيا">كيا</MenuItem>
                  <MenuItem value="لاندروفر">لاندروفر</MenuItem>
                  <MenuItem value="مازدا">مازدا</MenuItem>
                  <MenuItem value="مرسيدس">مرسيدس</MenuItem>
                  <MenuItem value="ميتسوبيشي">ميتسوبيشي</MenuItem>
                  <MenuItem value="نيسان">نيسان</MenuItem>
                  <MenuItem value="هوندا">هوندا</MenuItem>
                  <MenuItem value="هونداي">هونداي</MenuItem>
                    </Select>
                </FormControl>
                   
                <FormControl as={Col} id="outlined-basic">
                  <TextValidator name='teraz_no' size="small" variant="outlined" type="text"  label=" طراز المركبة" 
                   value={item.teraz_no}
                   onChange={(e)=>{Setterazno(e.target.value)}}
                   validators={['required',]}
                   errorMessages={['حقل مطلوب']}
                   />
                   
                  </FormControl>

                  <FormControl id="outlined-basic" as={Col}>
                   <InputLabel id="demo-simple-select-label"> سنة الصنع </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                   label="نوع السيارة"
                   size="small"
                   name='prod_year'
                   value={item.prod_year}
                   onChange={(e)=>{Setprodyear(e.target.value)}}
                  >
                    <MenuItem value="">الكل</MenuItem>
                    <MenuItem value="2023">2023</MenuItem>
                    <MenuItem value="2022">2022</MenuItem>
                    <MenuItem value="2021">2021</MenuItem>
                    <MenuItem value="2020">2020</MenuItem>
                    <MenuItem value="2019">2019</MenuItem>
                    <MenuItem value="2018">2018</MenuItem>
                    <MenuItem value="2017">2017</MenuItem>
                    <MenuItem value="2016">2016</MenuItem>
                    <MenuItem value="2015">2015</MenuItem>
                    <MenuItem value="2014">2014</MenuItem>
                    <MenuItem value="2013">2013</MenuItem>
                    <MenuItem value="2012">2012</MenuItem>
                    <MenuItem value="2011">2011</MenuItem>
                    <MenuItem value="2010">2010</MenuItem>
                    <MenuItem value="2009">2009</MenuItem>
                    <MenuItem value="2008">2008</MenuItem>
                    <MenuItem value="2007">2007</MenuItem>
                    <MenuItem value="2006">2006</MenuItem>
                    <MenuItem value="2005">2005</MenuItem>
                    <MenuItem value="2004">2004</MenuItem>
                    <MenuItem value="2003">2003</MenuItem>
                    <MenuItem value="2002">2002</MenuItem>
                    <MenuItem value="2001">2001</MenuItem>
                    <MenuItem value="2000">2000</MenuItem>
                    <MenuItem value="1999">1999</MenuItem>
                    <MenuItem value="1998">1998</MenuItem>
                    <MenuItem value="1997">1997</MenuItem>
                    <MenuItem value="1996">1996</MenuItem>
                    <MenuItem value="1995">1995</MenuItem>
                    <MenuItem value="1994">1994</MenuItem>
                    <MenuItem value="1993">1993</MenuItem>
                    <MenuItem value="1992">1992</MenuItem>
                    <MenuItem value="1991">1991</MenuItem>
                    <MenuItem value="1990">1990</MenuItem>
                    <MenuItem value="1989">1989</MenuItem>
                    <MenuItem value="1988">1988</MenuItem>
                    <MenuItem value="1987">1987</MenuItem>
                    <MenuItem value="1986">1986</MenuItem>
                    <MenuItem value="1985">1985</MenuItem>
                    <MenuItem value="1984">1984</MenuItem>
                    <MenuItem value="1983">1983</MenuItem>
                    <MenuItem value="1982">1982</MenuItem>
                    <MenuItem value="1981">1981</MenuItem>
                    <MenuItem value="1980">1980</MenuItem>
                    <MenuItem value="1979">1979</MenuItem>
                    <MenuItem value="1978">1978</MenuItem>
                    <MenuItem value="1977">1977</MenuItem>
                    <MenuItem value="1976">1976</MenuItem>
                    <MenuItem value="1975">1975</MenuItem>
                    <MenuItem value="1974">1974</MenuItem>
                    <MenuItem value="1973">1973</MenuItem>
                    <MenuItem value="1972">1972</MenuItem>
                    <MenuItem value="1971">1971</MenuItem>
                    <MenuItem value="1970">1970</MenuItem>
                    <MenuItem value="1969">1969</MenuItem>
                    <MenuItem value="1968">1968</MenuItem>
                    <MenuItem value="1967">1967</MenuItem>
                    <MenuItem value="1966">1966</MenuItem>
                    <MenuItem value="1965">1965</MenuItem>
                    </Select>
                </FormControl>

                  <FormControl as={Col} id="outlined-basic">
                  <TextValidator name='plate_no' size="small" variant="outlined" type="number"  label="رقم اللوحة" 
                   value={item.plate_no}
                   onChange={(e)=>{Setplateno(e.target.value)}}
                   validators={['required',]}
                   errorMessages={['حقل مطلوب']}
                   />
                   
                  </FormControl>
                  <FormControl as={Col} id="outlined-basic">
                  <TextValidator name='chas_no' size="small"  variant="outlined"  type="text"  label="رقم الشاصي"
                   value={item.chas_no}
                   onChange={(e)=>{Setchasno(e.target.value)}}
                   validators={['required']}
                   errorMessages={['حقل مطلوب']}
                  />
                   </FormControl>
                                        
              </Row>
              <Row className="row">
               
              
                    <FormControl as={Col} id="outlined-basic">
                    <TextValidator  name='sum_insur' size="small" variant="outlined" type="number"  label="قيمة المركبة"
                     value={item.sum_insur}
                     onChange={(e)=>{Setsuminsur(e.target.value)}}
                     validators={['required']}
                     errorMessages={['حقل مطلوب']} />
                    </FormControl>

                <FormControl as={Col} id="outlined-basic">
                  <TextValidator name='prem' size="small" variant="outlined" type="number" label="القسط" 
                   value={item.prem}
                   onChange={(e)=>{Setprem(e.target.value)}}
                   validators={['required',]}
                     errorMessages={['حقل مطلوب']}/>
                  </FormControl>
                 

                  <FormControl as={Col} id="outlined-basic">
                  <TextValidator name='discount' size="small" variant="outlined" type="number" label=" قيمة الخصم" 
                   value={item.discount}
                   onChange={(e)=>{Setdiscount(e.target.value)}}
                   validators={['required']}
                     errorMessages={['حقل مطلوب']}/>
                  </FormControl>
             
                  <FormControl as={Col} id="outlined-basic">
                  
                <TextValidator name='total_prem' size="small"  variant="outlined"  type="number" label=" القسط الاجمالي" 
                   
                   value={item.prem-item.discount}
                   onChange={(e)=>{Settotalprem(e.target.value)}}
                  // onFocus={premval}
                  //  validators={['required']}
                    //  errorMessages={['حقل مطلوب']}
                    />
                     
                  </FormControl>
                  <FormControl as={Col}  id="outlined-notes">
                 <TextValidator name='notes' size="small" variant="outlined" type="text" label=" اضافة ملاحظات" 
                  value={item.notes}
                  onChange={(e)=>{Setnotes(e.target.value)}}
                  validators={['required']}
                     errorMessages={['حقل مطلوب']}/>
                  
                 </FormControl>
                </Row>






              {/* <Row className="row1">
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
                      </Row> */}
                        <Button  type='submit' variant="contained">تحديث</Button>
                 </ValidatorForm>
                  
                  
              </Col>
          </Row>
      </div>
      
      )})}
     
      </>
    )
}
export default EditPage