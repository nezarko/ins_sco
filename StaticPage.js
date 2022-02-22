import React from 'react'
import {StaticData} from '../Components/StaticData'
import {Link,NavLink} from 'react-router-dom'
import { Form, Button,ButtonGroup, Card } from "react-bootstrap";
import BarChart from '../Components/BarChart';
const StaticPage = () => {
    return (
        <div className='main'>

        {StaticData.map((item,index)=>{
                        return(

                            <Card style={{display:"flex",flexdirection:'row',flexgrow: 3, width: '',margin:'0.3rem', shapeoutside:"border-box"}}>
                                <Card.Header style={{ color:'white',background:'brown'}} as="h6">{item.name}</Card.Header>
                            <Card.Body >
                                <Card.Title></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{item.icon}</Card.Subtitle>
                                <Card.Text className="mb-5 ">
                                {22333}
                                </Card.Text>
                                  
                            </Card.Body>
                            </Card>
                            )})}
                            <BarChart/>
                    </div>
    )
}

export default StaticPage
