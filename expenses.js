import React from 'react'
import { useState,useEffect } from "react";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import '../Style/expenses.css'
import { useForm } from "react-hook-form";
import {Tabs, Tab, Modal, Row, Button, Col, Form, Card, Container} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { display } from '@mui/system';
import exp from '../Images/exp.png'

const lurl="http://localhost:3001";
const url="https://alwafi.thesmartlogic.com";
toast.configure()
const Expenses=()=>{
  const [data,setData]=useState([])
  const [values, setValues] = useState({
 
    body: "",
    value:"",
   action_date:''
  });
  useEffect(() => {
    (async () => {
        axios.get(`${url}/getexpen`)
        .then((res)=>{ 
          setData(res.data);
         
        })})();}, []);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const notify3 = () => toast.success("تمت اضافة بند على المصروفات بنجاح",{position:toast.POSITION.TOP_RIGHT});
  const addexpen= async()=>{
      const res=await axios.post(`${url}/addexpen`,{body:values.body,value:values.value,action_date:values.action_date })
              .then(()=>{
                notify3()
              
                
              })
              .catch(error => {
                  console.log(error)
                  const notify2 = () => toast.error(error.response.data.message,{position:toast.POSITION.TOP_RIGHT});
                  if (error.response.status === 401||500)
                   notify2()
                }
                 )
                }
   
    return (
        <Container>
           <div>
          <Card style={{ width: '100%',height:'8rem',display: 'block', padding: 30}}>
          <Card.Title style={{fontSize:'1.5rem',color:'#0d6efd',justifyContent:'center'}}>مجموع مبلغ المصروفات
          
          </Card.Title>
          <Card.Body>
         <h4>{(data.reduce((a,v) =>  a = a + v.value , 0 ))} شيقل </h4> 
          </Card.Body>
        </Card>
          </div> 
            <div style={{ display: 'block', padding: 30,justifyContent:'center'}}>
         
            <h3 style={{backgroundColor:'#0d6efd',textAlign:'center',color:'white'}}>قسم ادخال المصروفات</h3>
            
            <Tabs  defaultActiveKey="1" className='nav'>
              <Tab   eventKey="1" title=" مصروفات خدمات">
             <Form >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label > * الوصف</Form.Label>
              <Form.Control name='body' type="text" required={true} as="textarea" rows={5} placeholder="ادخال التفاصيل ..."
               value={values.body}
               onChange={onChange}
               
               />
              <Form.Text className="text-muted">
               مثال:ضيافة,طعام
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label> * المبلغ - شيكل</Form.Label>
              <Form.Control name='value' required={true} type="number" placeholder="المبلغ - شيكل" 
               value={values.value}
               onChange={onChange}
               validators={['required']}
               errorMessages={['حقل مطلوب']}
              />
            </Form.Group>
            <Form.Group controlId="duedate">
            <Form.Label> * تاريخ الحركة</Form.Label>
              <Form.Control
                type="date"
                value={values.action_date}
                onChange={onChange}
                name="action_date"
                placeholder="تاريخ الحركة"
               />
            </Form.Group>
            <Button variant="primary" type="Button"  onClick={addexpen}>
              اضافة
            </Button>
          </Form>
        </Tab>

        
        <Tab className='tab' eventKey="2" title="مصروفات مستلزمات مكتبية">
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label > * الوصف</Form.Label>
              <Form.Control name='body' type="text" as="textarea" rows={5} placeholder="ادخال التفاصيل ..." 
               value={values.body}
               onChange={onChange}
              />
              <Form.Text className="text-muted">
               مثال:ورق طباعة,شراء حبر
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label> * المبلغ - شيكل</Form.Label>
              <Form.Control  name='value' type="number" placeholder="المبلغ - شيكل" 
               value={values.value}
               onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId="duedate">
            <Form.Label> * تاريخ الحركة</Form.Label>
              <Form.Control
                type="date"
                name="action_date"
                placeholder="تاريخ الحركة"
                value={values.value}
                onChange={onChange}
              />
            </Form.Group>
            <Button variant="primary"  type="Button"  onClick={addexpen}>
              اضافة
            </Button>
          </Form>



        </Tab>
        <Tab   eventKey="3" title=" مصروفات صيانة">
             <Form >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label > * الوصف</Form.Label>
              <Form.Control name='body' type="text" as="textarea" rows={5} placeholder="ادخال التفاصيل ..."
               value={values.body}
               onChange={onChange}
               />
              <Form.Text className="text-muted">
               مثال:صيانة اثاث,صيانة اجهزة
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label> * المبلغ - شيكل</Form.Label>
              <Form.Control name='value' type="number" placeholder="المبلغ - شيكل" 
               value={values.value}
               onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId="duedate">
            <Form.Label> * تاريخ الحركة</Form.Label>
              <Form.Control
                type="date"
                value={values.action_date}
                onChange={onChange}
                name="action_date"
                placeholder="تاريخ الحركة"
               />
            </Form.Group>
            <Button variant="primary" type="Button"  onClick={addexpen}>
              اضافة
            </Button>
          </Form>


        </Tab>



        <Tab   eventKey="4" title=" مصروفات مواصلات">
             <Form >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label > * الوصف</Form.Label>
              <Form.Control name='body' type="text" as="textarea" rows={5} placeholder="ادخال التفاصيل ..."
               value={values.body}
               onChange={onChange}
               />
              <Form.Text className="text-muted">
               مثال:مواصلات عمل,مهام خارجية
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label> * المبلغ - شيكل</Form.Label>
              <Form.Control name='value' type="number" placeholder="المبلغ - شيكل" 
               value={values.value}
               onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId="duedate">
            <Form.Label> * تاريخ الحركة</Form.Label>
              <Form.Control
                type="date"
                value={values.action_date}
                onChange={onChange}
                name="action_date"
                placeholder="تاريخ الحركة"
               />
            </Form.Group>
            <Button variant="primary" type="Button"  onClick={addexpen}>
              اضافة
            </Button>
          </Form>


        </Tab>



        <Tab   eventKey="5" title=" مصروفات اخرى">
             <Form >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label > * الوصف</Form.Label>
              <Form.Control name='body' type="text" as="textarea" rows={5} placeholder="ادخال التفاصيل ..."
               value={values.body}
               onChange={onChange}
               />
              <Form.Text className="text-muted">
               مثال:اخرى
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label> * المبلغ - شيكل</Form.Label>
              <Form.Control name='value' type="number" placeholder="المبلغ - شيكل" 
               value={values.value}
               onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId="duedate">
            <Form.Label> * تاريخ الحركة</Form.Label>
              <Form.Control
                type="date"
                value={values.action_date}
                onChange={onChange}
                name="action_date"
                placeholder="تاريخ الحركة"
               />
            </Form.Group>
            <Button variant="primary" type="Button"  onClick={addexpen}>
              اضافة
            </Button>
          </Form>


        </Tab>
      </Tabs>
    </div>
   
        </Container>
    )
}
export default Expenses;