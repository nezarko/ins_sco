import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import moment from 'moment'
import * as Faicons from 'react-icons/all'
import {Link,useParams,useNavigate} from 'react-router-dom'
import {StaticData} from '../Components/StaticData'
import { Form, Button,ButtonGroup, Card } from "react-bootstrap";


const lurl="http://localhost:3001";
const url="https://alwafi.thesmartlogic.com";
const StaticPage = () => {
    const [totalcash,setTotalcash]=useState([])
    const [totalchq,setTotalchq]=useState([])
    const [totaldoc,setTotaldoc]=useState([])
    const [carcount,setCarcount]=useState([])
    const [gencount,setGencount]=useState([])
    const [todaycount,setTodaycount]=useState([])
    const [allchqcount,setAlchqcount]=useState([])
    const [depositchq,setDepositchq]=useState([])
    const [returnavdcount,setReturnavdcount]=useState([])
    const [cashtoday,setcashtoday]=useState([])
    
   
    useEffect(async() => {
        axios.get(`${url}/totalinscounts`)
        .then((response) => {
            setTotaldoc(response.data);
            console.log(response.data)
                    });
        axios.get(`${url}/carinscounts`)
        .then((response) => {
            setCarcount(response.data);
            console.log(response.data)
                    });
         axios.get(`${url}/geninscounts`)
                   .then((response) => {
                    setGencount(response.data);
                        console.log(response.data)
                                });
         axios.get(`${url}/uwtoday`)
                 .then((response) => {
                    setTodaycount(response.data);
                  console.log(response.data)
                    });   
                    axios.get(`${url}/allchqcount`)
                    .then((response) => {
                        setAlchqcount(response.data);
                     console.log(response.data)
                       });   
                       axios.get(`${url}/depositchq`)
                       .then((response) => {
                        setDepositchq(response.data);
                        console.log(response.data)
                          });  
                          axios.get(`${url}/returnavdcount`)
                          .then((response) => {
                           setReturnavdcount(response.data);
                           console.log(response.data)
                             });   
                             axios.get(`${url}/cashtoday`)
                             .then((response) => {
                              setcashtoday(response.data);
                              console.log(response.data)
                                });
                                axios.get(`${url}/allcash`)
                                .then((response) => {
                                setTotalcash(response.data);
                                 console.log(response.data)
                                   });                     
                         
      }, []);

    return (
        <div className='main'>

        {totaldoc.map((item,index)=>{
                        return(

                            <Card style={{display:"flex",flexdirection:'row', justifycontent:"space-between",color:'#004960',fontSize:'X-large', height:'200px',width:"150px",margin:'3px', shapeoutside:"border-box",color: '#0284c7'}}>
                                <Card.Header style={{ color:'white',background:'#004960'}} as="h6">{'عدد  الوثائق'}</Card.Header>
                            <Card.Body >
                                
                                <Card.Title></Card.Title>
                                <Card.Subtitle style={{display:"flex",fontSize:'X-large',justifyContent:'center'}}>< Faicons.RiNumbersFill/></Card.Subtitle>
                                <Card.Text style={{display:"flex",paddingTop:'15px',fontSize:'XX-large',justifyContent:'center'}} >
                                      {item.c}
                                </Card.Text>
                                  
                            </Card.Body>
                            </Card>
                            )})}


{todaycount.map((item,index)=>{
                        return(

                            <Card style={{display:"flex",flexdirection:'row', justifycontent:"space-between",color:'#004960',fontSize:'X-large', height:'200px',width:"150px",margin:'3px', shapeoutside:"border-box",color: '#0284c7'}}>
                                <Card.Header style={{ color:'white',background:'#004960'}} as="h6">{'المصدر  اليوم'}</Card.Header>
                            <Card.Body >
                                <Card.Title></Card.Title>
                                <Card.Subtitle style={{display:"flex",fontSize:'X-large',justifyContent:'center'}}>< Faicons.MdCalendarToday/></Card.Subtitle>
                                <Card.Text style={{display:"flex",paddingTop:'15px',fontSize:'XX-large',justifyContent:'center'}}>
                            {item.c}
                                </Card.Text>
                                  
                            </Card.Body>
                            </Card>
                            )})}



{allchqcount.map((item,index)=>{
                        return(

                            <Card style={{display:"flex",flexdirection:'row', justifycontent:"space-between",color:'#004960',fontSize:'X-large', height:'200px',width:"150px",margin:'3px', shapeoutside:"border-box",color: '#0284c7'}}>
                                <Card.Header style={{ color:'white',background:'#004960'}} as="h6">{'الشيكات مقبوضة'}</Card.Header>
                            <Card.Body >
                                <Card.Title></Card.Title>
                                <Card.Subtitle style={{display:"flex",fontSize:'X-large',justifyContent:'center'}}>< Faicons.GiPapers/></Card.Subtitle>
                                <Card.Text style={{display:"flex",paddingTop:'15px',fontSize:'XX-large',justifyContent:'center'}}>
                            {item.c}
                                </Card.Text>
                                  
                            </Card.Body>
                            </Card>
                            )})}


{depositchq.map((item,index)=>{
                        return(

                            <Card style={{display:"flex",flexdirection:'row', justifycontent:"space-between",color:'#004960',fontSize:'X-large', height:'200px',width:"150px",margin:'3px', shapeoutside:"border-box",color: '#0284c7'}}>
                                <Card.Header style={{ color:'white',background:'#004960'}} as="h6">{'الشيكات للصرف'}</Card.Header>
                            <Card.Body >
                                <Card.Title></Card.Title>
                                <Card.Subtitle style={{display:"flex",fontSize:'XX-large',justifyContent:'center'}}>< Faicons.FiCreditCard/></Card.Subtitle>
                                <Card.Text style={{display:"flex",paddingTop:'15px',fontSize:'X-large',justifyContent:'center'}}>
                            {item.c}
                                </Card.Text>
                                  
                            </Card.Body>
                            </Card>
                            )})}


{carcount.map((item,index)=>{
    
                        return(

                            <Card style={{display:"flex",flexdirection:'row', justifycontent:"space-between",color:'#004960',fontSize:'X-large', height:'200px',width:"150px",margin:'3px', shapeoutside:"border-box",color: '#0284c7'}}>
                                <Card.Header style={{ color:'white',background:'#004960'}} as="h6">{'تأمينات السيارات'}</Card.Header>
                            <Card.Body >
                                <Card.Title></Card.Title>
                                <Card.Subtitle style={{display:"flex",fontSize:'XX-large',justifyContent:'center'}}>< Faicons.FaCarSide/></Card.Subtitle>
                                <Card.Text style={{display:"flex",paddingTop:'15px',fontSize:'X-large',justifyContent:'center'}}>
                            {item.c}
                            
                                </Card.Text>
                                  
                            </Card.Body>
                            </Card>
                            )})}

{gencount.map((item,index)=>{
                        return(

                            <Card style={{display:"flex",flexdirection:'row', justifycontent:"space-between",color:'#004960',fontSize:'X-large', height:'200px',width:"150px",margin:'3px', shapeoutside:"border-box",color: '#0284c7'}}>
                                <Card.Header style={{ color:'white',background:'#004960'}} as="h6">{'تأمينات العامة'}</Card.Header>
                            <Card.Body >
                                <Card.Title></Card.Title>
                                <Card.Subtitle style={{display:"flex",fontSize:'XX-large',justifyContent:'center'}}>< Faicons.BiHome/></Card.Subtitle>
                                <Card.Text style={{display:"flex",paddingTop:'15px',fontSize:'X-large',justifyContent:'center'}}>
                            {item.c}
                                </Card.Text>
                                  
                            </Card.Body>
                            </Card>
                            )})}

{returnavdcount.map((item,index)=>{
                        return(

                            <Card style={{display:"flex",flexdirection:'row', justifycontent:"space-between",color:'#004960',fontSize:'X-large', height:'200px',width:"150px",margin:'3px', shapeoutside:"border-box",color: '#0284c7'}}>
                                <Card.Header style={{ color:'white',background:'#004960'}} as="h6">{' حركات قيد مرتجع'}</Card.Header>
                            <Card.Body >
                                <Card.Title></Card.Title>
                                <Card.Subtitle style={{display:"flex",fontSize:'X-large',justifyContent:'center'}}>< Faicons.BsArrowCounterclockwise/></Card.Subtitle>
                                <Card.Text style={{display:"flex",paddingTop:'15px',fontSize:'X-large',justifyContent:'center'}}>
                            {item.c}
                                </Card.Text>
                                  
                            </Card.Body>
                            </Card>
                            )})}

{cashtoday.map((item,index)=>{
                        return(

                            <Card style={{display:"flex",flexdirection:'row', justifycontent:"space-between",color:'#004960',fontSize:'X-large', height:'200px',width:"150px",margin:'3px', shapeoutside:"border-box",color: '#0284c7'}}>
                                <Card.Header style={{ color:'white',background:'#004960'}} as="h6">{'قبض كاش اليوم'}</Card.Header>
                            <Card.Body >
                                <Card.Title></Card.Title>
                                <Card.Subtitle style={{display:"flex",fontSize:'X-large',justifyContent:'center'}}>< Faicons.BiCoinStack/></Card.Subtitle>
                                <Card.Text style={{display:"flex",paddingTop:'15px',fontSize:'X-large',justifyContent:'center'}}>
                            {item.cash}
                                </Card.Text>
                                  
                            </Card.Body>
                            </Card>
                            )})}
             
             <Card style={{display:"flex",flexdirection:'row', justifycontent:"space-between",color:'#004960',fontSize:'X-large', height:'200px',width:"150px",margin:'3px', shapeoutside:"border-box",color: '#0284c7'}}>
                                <Card.Header style={{ color:'white',background:'#004960'}} as="h6">{'اجمالي المبلغ المقبوض نقدا'}</Card.Header>
                            <Card.Body >
                                <Card.Title></Card.Title>
                                <Card.Subtitle style={{display:"flex",fontSize:'X-large',justifyContent:'center'}}>< Faicons.BiCoinStack/></Card.Subtitle>
                                <Card.Text style={{display:"flex",paddingTop:'15px',fontSize:'large',justifyContent:'center'}}>
                            {(totalcash.reduce((a,v) =>  a = a + v.cash , 0 ))} شيقل
                                </Card.Text>
                                  
                            </Card.Body>
                            </Card>

                            <Card style={{display:"flex",flexdirection:'row', justifycontent:"space-between",color:'#004960',fontSize:'X-large', height:'200px',width:"150px",margin:'3px', shapeoutside:"border-box",color: '#0284c7'}}>
                                <Card.Header style={{ color:'white',background:'#004960'}} as="h6">{'اجمالي المبلغ المقبوض شيكات'}</Card.Header>
                            <Card.Body >
                                <Card.Title></Card.Title>
                                <Card.Subtitle style={{display:"flex",fontSize:'X-large',justifyContent:'center'}}>< Faicons.BiCoinStack/></Card.Subtitle>
                                <Card.Text style={{display:"flex",paddingTop:'15px',fontSize:'large',justifyContent:'center'}}>
                            {(totalcash.reduce((a,v) =>  a = a + v.chq_value , 0 ))} شيقل
                                </Card.Text>
                                  
                            </Card.Body>
                            </Card>


                           
                    </div>
    )




    
     




}

export default StaticPage
