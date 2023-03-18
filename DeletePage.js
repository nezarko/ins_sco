import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import {Link,useParams} from 'react-router-dom'
import { Modal } from '@themesberg/react-bootstrap';
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

const lurl="http://localhost:3001";
const url="https://alwafi.thesmartlogic.com";
const baseURL =`${url}/showbyid`;

const DeletePage = () => {
    const [post,setPost]=useState([]);
    const {rowid}=useParams();
    const [showDefault, setShowDefault] = useState(false);
    const handleClose = () => setShowDefault(false);



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
           <div >
           <React.Fragment >
      <Button variant="primary"  className="my-3" onClick={() => setShowDefault(true)}>كشف حساب</Button>

      <Modal style={{marginTop:"2rem",color:"#004960",}} as={Modal.Dialog}  centered show={showDefault} onHide={handleClose}>
    <Modal.Header>
    <button className='excle'></button>
      <Modal.Title className="h6">  <input type="number" class="form-control" placeholder=" ابحث من خلال رقم الحساب"/> </Modal.Title>
      
      <Button variant="close" aria-label="Close" onClick={handleClose} />
    </Modal.Header>
    <Modal.Body>
        
    </Modal.Body>
    
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        I Got It
    </Button>
      <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
        اغلاق
    </Button>
    </Modal.Footer>
  </Modal>
</React.Fragment>

</div>
     </> 
    
    
    )
}
export default DeletePage