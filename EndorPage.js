import React, { useState,useEffect,useRef} from 'react'
import axios from 'axios'
import '../Style/ScoPage.css'
//import "bootstrap/dist/css/bootstrap.css"
import { Form,Container,Row,Col, FormGroup, ControlLabel,Image,Dropdown,ButtonGroup } from "react-bootstrap";
import { FaBullseye } from 'react-icons/fa';
import {FormControl,MenuItem,Select,InputLabel,Button} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReactToPrint } from 'react-to-print';
import { useForm } from "react-hook-form";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const lurl="http://localhost:3001";
const url="https://alwafi.thesmartlogic.com";

toast.configure()
const EndorPage=(props)=>{
  const [showhide, setShowhide]=useState('');
  const [allpolno,setAllpolno]=useState([])
  const [value, setValue] = useState('')
  const handleshowhidemajins=(e)=>{   
    setShowhide(e.target.value);

  }
  const [values, setValues] = useState({
    pol_no: "",
    real_pol_no:"",
    pol_year: "2022",
    endor_type:"",
    ins_comp: "",
    acc_type: "",
    comp_acc: "",
    comp_name: "",
    cust_name: "",
    maj_ins: "",
    min_ins: "",
    reg_dt: "",
    start_dt: "",
    cust_id: "",
    cust_jaw: "",
    car_type:"",
    teraz_no:"",
    prod_year:"",
    end_dt: "",
    plate_no: "",
    chas_no: "",
    sum_insur: "",
    cover_details: "",
    prem: "",
    discount: "",
    total_prem: "",
    notes: "",
  });
  
 
    const notify = () => toast.success("تمت اضافة الوثيقة بنجاح",{position:toast.POSITION.TOP_RIGHT});
   
    const addemp=()=>{
      
        axios.post(`${url}/create`,{pol_no:values.pol_no,pol_year:values.pol_year,ins_comp:values.ins_comp,acc_type:values.acc_type,
        comp_acc:values.comp_acc,comp_name:values.comp_name,cust_name:values.cust_name,maj_ins:values.maj_ins,min_ins:values.min_ins,reg_dt:values.reg_dt,start_dt:values.start_dt,
        end_dt:values.end_dt,cust_id:values.cust_id,cust_jaw:values.cust_jaw,car_type:values.car_type,teraz_no:values.teraz_no,prod_year:values.prod_year,plate_no:values.plate_no,chas_no:values.chas_no,sum_insur:values.sum_insur,
        prem:values.prem,discount:values.discount,total_prem:values.total_prem,notes:values.notes,doc_type:"ملحق",endor_type:values.endor_type,real_pol_no:values.real_pol_no
    })
        .then((res)=>{
          notify()
            
         }).catch(error => {
          const notify2 = () => toast.error(error.response.data.message,{position:toast.POSITION.TOP_RIGHT});
          if (error.response.status === 401||400)
           notify2()
        }
         )
       
       }
     

       const componentRef = useRef();
       const handlePrint = useReactToPrint({
       content: () => componentRef.current,
          });

          const { register, handleSubmit, reset, formState: { errors } } = useForm();
          const onChange = (e) => {
            setValues({ ...values, [e.target.name]: e.target.value });
           
          };
          const handleFormReset = (e) => {
            setValues(() =>'')
            setValues({ pol_no: "",
            real_pol_no:"",
            pol_year: "2022",
            doc_type:"",
            endor_type:"",
            ins_comp: "",
            acc_type: "",
            comp_acc: "",
            comp_name: "",
            cust_name: "",
            maj_ins: "",
            min_ins: "",
            reg_dt: "",
            start_dt: "",
            cust_id: "",
            cust_jaw: "",
            car_type:"",
            teraz_no:"",
            prod_year:"",
            end_dt: "",
            plate_no: "",
            chas_no: "",
            sum_insur: "",
            cover_details: "",
            prem: "",
            discount: "",
            total_prem: "",
            notes: "", });
            }
  

         var premval=()=>{
          console.log(values.prem-values.discount)
          var tprem=values.prem-values.discount
          console.log(tprem)
            }

           const twoCalls = e => {
            handleshowhidemajins(e)
               onChange(e)
            }
            useEffect(() => {
              (async () => {
              const result = await axios(`${url}/getallpolno`);
              setAllpolno(result.data)
              console.log(result.data)
              })();
            }, []);
         
    return(
        <>
      
         

        <div className="container" >
        
              <h1 style={{marginTop:"2rem",color:"white",backgroundColor:'#0284c7',fontFamily:'Tajawal,Helvetica Neue,sans-serif',fontWeight:'700'}} className="shadow-sm  text-center   ">اضافة ملحق جديد </h1>
              <Row className="mainrow">
                <Col className="col shadow-sm inputs">
               
                <ValidatorForm className="form" onSubmit={handleSubmit(addemp)} 
                onError={errors => console.log(errors)}
                onReset={handleFormReset}
                 >
                <Row className="row1">
                       
                        <FormControl  id="outlined-basic" as={Col} controlId="formGridPassword">
                        <TextValidator name='pol_year' size="small"  variant="outlined" type="number" InputProps={{ readOnly: true,shrink: true }}label="سنة الوثيقة"  value={2022}/>
                        </FormControl>

                        <FormControl id="outlined-basic" as={Col}>
                        <InputLabel id="demo-simple-select-label"> نوع الملحق</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                         label="نوع الوثيقة"
                         size="small"
                         name="endor_type"
                         value={values.endor_type}
                         onChange={onChange}
                          //ref={register}
                        >
                          
                          <MenuItem value={'تجديد'}> ملحق تجديد</MenuItem>
                          <MenuItem value={'نقل ملكية'}> ملحق نقل ملكية</MenuItem>
                          <MenuItem value={'رقم مركبة'}> ملحق اضافة رقم مركبة</MenuItem>
                          <MenuItem value={'اضافة سائقين'}>ملحق اضافة سائقين </MenuItem>
                      
                          
                          </Select>
                          
                      </FormControl>
                      <FormControl  id="outlined-basic" as={Col} controlId="formGridPassword">
                        <TextValidator name='real_pol_no' size="small" variant="outlined" type="number"  label="رقم الوثيقة الاصل" 
                          value={values.real_pol_no}
                          onChange={onChange}
                          validators={['required']}
                          errorMessages={['حقل مطلوب']}
                         
                            />
                        </FormControl>
                      
                      
                    
                        <FormControl  id="outlined-basic" as={Col} controlId="formGridPassword">
                        <TextValidator name='pol_no' size="small" variant="outlined" type="number"   label="رقم الملحق" 
                          value={values.pol_no}
                          onChange={onChange}
                          validators={['required']}
                          errorMessages={['حقل مطلوب']}
                         
                            />
                        </FormControl>

                        <FormControl id="outlined-basic" as={Col}>
                        <InputLabel id="demo-simple-select-label"> شركة التأمين</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                         label="شركة التأمين"
                         size="small"
                         name="ins_comp"
                         value={values.ins_comp}
                         onChange={onChange}
                          //ref={register}
                        >
                          <MenuItem value={'فلسطين للتأمين'}>فلسطين للتأمين</MenuItem>
                          <MenuItem value={'التكافل للتأمين'}>التكافل للتأمين</MenuItem>
                          <MenuItem value={'ترست للتأمين'}>ترست للتأمين</MenuItem>
                          <MenuItem value={'الوطنية للتأمين'}>الوطنية للتأمين</MenuItem>
                          <MenuItem value={'المشرق للتأمين'}>المشرق للتأمين</MenuItem>
                          <MenuItem value={'تمكين للتأمين'}>تمكين للتأمين</MenuItem>
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
                         value={values.acc_type}
                         onChange={onChange}
                        >
                          <MenuItem value={'أفراد'}>أفراد</MenuItem>
                          <MenuItem value={'شركات'}>شركات</MenuItem>
                          </Select>
                      </FormControl>
                         
                        <FormControl as={Col} id="outlined-basic">
                        <TextValidator size="small" variant="outlined" name='comp_acc' type="number"   label="رقم حساب الشركة"
                         value={values.comp_acc}
                         onChange={onChange}
                         validators={['required']}
                         errorMessages={['حقل مطلوب']}
                     
                        />
                         </FormControl>
                        
                    </Row>

                    <Row className="row2">
                    <FormControl  as={Col} id="outlined-basic">
                         <TextValidator name='comp_name' size="small" variant="outlined" type="text"   label="اسم الشركة" 
                          value={values.comp_name}
                          onChange={onChange}
                          validators={['required']}
                          errorMessages={['حقل مطلوب']}
                         
                            />
                        
                        </FormControl>
                         <FormControl  as={Col} id="outlined-basic">
                         <TextValidator name='cust_name' size="small" variant="outlined" type="text"   label="اسم الزبون" 
                          value={values.cust_name}
                          onChange={onChange}
                          validators={['required']}
                          errorMessages={['حقل مطلوب']}
                         
                            />
                           
                        </FormControl>


                        <FormControl id="outlined-basic" as={Col}>
                        <InputLabel id="demo-simple-select-label">التأمين الرئيسي</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                         label="التأمين الرئيسي"
                         size="small"
                         name='maj_ins'
                         value={values.maj_ins}
                         onChange={twoCalls}
                         
                        >
                          <MenuItem value={'سيارات'}>سيارات</MenuItem>
                          <MenuItem value={'عامة'}>عامة</MenuItem>
                          </Select>
                      </FormControl>

                      {showhide=='سيارات'?       
                      <FormControl id="outlined-basic" as={Col}>
                      <InputLabel id="demo-simple-select-label">التأمين الفرعي</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                       label="التأمين الفرعي"
                       size="small"
                        name='min_ins'
                        value={values.min_ins}
                       onChange={onChange}
                      >
                        <MenuItem value={'شامل'}>شامل</MenuItem>
                        <MenuItem value={'طرف ثالث'}>طرف ثالث</MenuItem>
                        <MenuItem value={'شامل وطرف ثالث'}> شامل وطرف ثالث</MenuItem>
                        <MenuItem value={'موحد'}>موحد</MenuItem>
                        </Select>
                    </FormControl>
                    :
                    <FormControl id="outlined-basic" as={Col}>
                        <InputLabel id="demo-simple-select-label">التأمين الفرعي</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                         label="التأمين الفرعي"
                         size="small"
                          name='min_ins'
                          value={values.min_ins}
                         onChange={onChange}
                        >
                         
                          <MenuItem value={'عامة'}>عامة</MenuItem>
                          <MenuItem value={'حريق'}>حريق</MenuItem>
                          <MenuItem value={'حريق وسرقة'}>حريق وسرقة</MenuItem>
                          <MenuItem value={'هندسي'}>هندسي</MenuItem>
                          <MenuItem value={'عمال'}>عمال</MenuItem>
                          </Select>
                      </FormControl>
                    
                    
                    
                    
                    }
                      
                     <FormControl as={Col} id="outlined-basic">
                       
                        <TextValidator name='reg_dt' size="small" helperText=" تاريخ التسجيل" variant="outlined" type="date" label="" 
                         value={values.reg_dt}
                         onChange={onChange}
                         validators={['required']}
                         errorMessages={['حقل مطلوب']}
                        />
                       </FormControl>
                        <FormControl  as={Col} id="outlined-basic">
                       <TextValidator  name='start_dt' size="small"  helperText="بداية التامين" variant="outlined" type="date"  label=""
                        value={values.start_dt}
                        onChange={onChange}
                        validators={['required']}
                         errorMessages={['حقل مطلوب']}
                       />
                        </FormControl>
                        <FormControl  as={Col} id="outlined-basic">
                        <TextValidator name='end_dt' size="small" helperText="نهاية التأمين" variant="outlined" type="date"  label=" "
                         value={values.end_dt}
                         onChange={onChange}
                         validators={['required']}
                         errorMessages={['حقل مطلوب']}
                        />
                        </FormControl>
                        

                        
                        
                    </Row>
                      
                    <Row className="row4">
                    <FormControl as={Col} id="outlined-basic">
                        <TextValidator name='cust_id' size="small" variant="outlined" type="number"  label="  هوية الزبون"
                         value={values.cust_id}
                         onChange={onChange}
                         validators={['required']}
                         errorMessages={['حقل مطلوب']}
                        />
                        </FormControl>
                    <FormControl as={Col} id="outlined-basic">
                        <TextValidator  name='cust_jaw' size="small"  variant="outlined" type="number"  label="رقم جوال الزبون" 
                         value={values.cust_jaw}
                         onChange={onChange}
                         validators={['required','isNumber']}
                         errorMessages={['حقل مطلوب','ادخل رقم فقط']}
                        />

                        </FormControl>
                        
                        <FormControl id="outlined-basic" as={Col}>
                         <InputLabel id="demo-simple-select-label">نوع السيارة </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                         label="نوع السيارة"
                         size="small"
                         name='car_type'
                         value={values.car_type}
                         onChange={onChange}
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
                         value={values.teraz_no}
                         onChange={onChange}
                         validators={['required',]}
                         errorMessages={['حقل مطلوب']}
                         />
                         
                        </FormControl>
                       

                      
                        <FormControl id="outlined-basic" as={Col}>
                         <InputLabel id="demo-simple-select-label"> سنة الصنع </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                         label="سنة الصنع"
                         size="small"
                         name='prod_year'
                         value={values.prod_year}
                         onChange={onChange}
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
                        <TextValidator name='plate_no' size="small" variant="outlined" type="text"  label="رقم اللوحة" 
                         value={values.plate_no}
                         onChange={onChange}
                         validators={['required',]}
                         errorMessages={['حقل مطلوب']}
                         />
                         
                        </FormControl>
                       
                        <FormControl as={Col} id="outlined-basic">
                        <TextValidator name='chas_no' size="small"  variant="outlined"  type="text"  label="رقم الشاصي"
                         value={values.chas_no}
                         onChange={onChange}
                         validators={['required']}
                         errorMessages={['حقل مطلوب']}
                        />
                         </FormControl>
                        
                                              
                    </Row>
                    <Row className="row">
                   
                  
                        <FormControl as={Col} id="outlined-basic">
                        <TextValidator  name='sum_insur' size="small" variant="outlined" type="number"  label="قيمة العين"
                         value={values.sum_insur}
                         onChange={onChange}
                         validators={['required']}
                         errorMessages={['حقل مطلوب']} />
                        </FormControl>

                    <FormControl as={Col} id="outlined-basic">
                      <TextValidator name='prem' size="small" variant="outlined" type="number" label="القسط" 
                       value={values.prem}
                       onChange={onChange}
                       validators={['required',]}
                         errorMessages={['حقل مطلوب']}/>
                      </FormControl>
                     

                      <FormControl as={Col} id="outlined-basic">
                      <TextValidator name='discount' size="small" variant="outlined" type="number" label=" قيمة الخصم" 
                       value={values.discount}
                       onChange={onChange}
                       validators={['required']}
                         errorMessages={['حقل مطلوب']}/>
                      </FormControl>
                 
                      <FormControl as={Col} id="outlined-basic">
                      
                    <TextValidator name='total_prem' size="small"  variant="outlined"  type="number" label=" القسط الاجمالي" 
                       
                       value={values.prem-values.discount}
                       onFocus={onChange}
                      // onFocus={premval}
                       validators={['required']}
                         errorMessages={['حقل مطلوب']}/>
                         
                      </FormControl>
                      <FormControl as={Col}  id="outlined-notes">
                     <TextValidator name='notes' size="small" variant="outlined" type="text" label=" اضافة ملاحظات" 
                      value={values.notes}
                      onChange={onChange}
                      validators={['required']}
                         errorMessages={['حقل مطلوب']}/>
                      
                     </FormControl>
                    </Row>
                    <Row>
                   
                    </Row>
                    <Button style={{padding:'3px'}} type='submit' variant="contained" > <span className='icon'>{<AddCircleIcon />} اضافة </span></Button>

                    <Button style={{padding:'3px',width:'60px',height:'48px',margin:'10px',fontSize:'1.2rem',fontFamily:'cursive'}}   variant="contained" value="Reset" type="reset" >تفريغ</Button>
                    
                    </ValidatorForm>
                   
                   
                 </Col>
                
                
               
            </Row>
        </div>
        </>
    )
}
export default EndorPage