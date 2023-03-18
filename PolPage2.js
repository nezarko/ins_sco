import React, {useMemo,useState,useEffect} from 'react'
import axios from "axios";
import { Modal,Col,Row } from '@themesberg/react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Button } from 'react-bootstrap';
import {FormControl,TextField} from '@mui/material';
import {Link,NavLink,useHistory,useParams } from 'react-router-dom'
import '../Style/PolPage2.css'
import { BsEyeFill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import {FcCalculator} from 'react-icons/fc'
import {FiSearch} from 'react-icons/fi'
import {GrReturn} from 'react-icons/gr'
import {TiDocumentAdd} from 'react-icons/ti'

import {MdOutlineClear} from 'react-icons/md'
import {AiFillDelete} from 'react-icons/ai'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from 'react-toastify';
import {Totalpolnotif,Renualnotif} from '../Components/Notification';


toast.configure()
const url="http://localhost:3000";
const Lurl="https://alwafi.thesmartlogic.com";
const baseURL =`${url}/showbyid`;

function patchFilterFactory(filterFactory, onFilteredData) {
  return (...args) => {
     const {
        createContext,
        options
     } = filterFactory(...args)
     return {
        createContext: (...args) => {
           const {
              Provider: BaseProvider,
              Consumer
           } = createContext(...args)
           const Provider = class FilterProvider extends BaseProvider {
              componentDidUpdate() {
                 onFilteredData(this.data)
              }
           }
           return {
              Provider,
              Consumer
           }
        },
        options
     }
  }
}
// const pagination = paginationFactory({
//   page: 1,
//   sizePerPage: 10,
//   lastPageText: '>>',
//   firstPageText: '<<',
//   nextPageText: '>',
//   prePageText: '<',
//   showTotal: true,
//   alwaysShowAllBtns: true,
//   onPageChange: function (page, sizePerPage) {
//     console.log('page', page);
//     console.log('sizePerPage', sizePerPage);
//   },
//   onSizePerPageChange: function (page, sizePerPage) {
//     console.log('page', page);
//     console.log('sizePerPage', sizePerPage);
//   }
// });






const PolPage2 = () => {
  const [data, setData] = useState([]);
  const [pol, setPol] = useState([]);
  const [databyid, setDatabyid] = useState([]);
  const [del,setDel]=useState()
  let history = useHistory ();
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);
  const {rowid}=useParams();
  const [acc_no,setAcc_no]=useState()
  const [return_val,setReturn_val]=useState()
  const [pol_no,setPolno]=useState()
    const [pol_year,setPolyear]=useState()
    const [cust_acc,setCustacc]=useState()
    const [cust_name,setCustname]=useState()
    const [reg_dt,setRegdt]=useState()
    const [total_prem,setTotalprem]=useState()
    const [cach,setCash]=useState()
  const notify = () => toast.info("تمت عملية حذف البيانات بنجاح",{position:toast.POSITION.TOP_CENTER});
  

  const columns = [
    {
      dataField: "pol_no",
      text: "رقم الوثيقة",
      sort: true,
     /*{filter: textFilter({
        delay: 0,
      })
   } */
    },
   
    {
      dataField: "pol_year",
     /* filter: textFilter({
        delay: 0
      }),*/
      text: "السنة",
      sort: true,
    
    },
    {
      dataField: "ins_comp",
     /* filter: textFilter({
        delay: 0
      }),*/
      text: "شركة التأمين",
      sort: true,
    
    },
   
    {
      dataField: "acc_type",
      text: "نوع الحساب",
      sort: true,
      
    },
    {
      dataField: "cust_acc",
      text: " حساب الزبون",
      sort: true,
      
    },
    {
      dataField: "comp_name",
      text: "اسم الشركة",
      sort: true,
      
    },
    {
      dataField: "cust_name",
      text: "اسم الزبون",
      sort: true,
      rowspan: 2,
          align: 'center',
          valign: 'middle',
          sortable: true,
          
         
         
      
    },
    {
      dataField: "maj_ins",
      text: "التأمين الرئيسي",
      sort: true,
      
    },
    {
      dataField: "min_ins",
      text: "التأمين الفرعي",
      sort: true,
      
    },
    {
      dataField: 'action',
      text: 'الاجراءات',
      rowspan: 2,
      align: 'center',
      valign: 'middle',
      sortable: true,
      formatter: (cell, row, rowIndex, formatExtraData) => { 
        var rowid = row.id;
        
        
        return (  
          
          <> 
         <Link to={`/show/${rowid}`}><Button variant="primary" className="policon" ><BsEyeFill /> </Button> </Link>
         <Link to={`/edit/${rowid}`}><Button variant="primary" className="policon" ><FaRegEdit /></Button></Link>
         <Link to={`/accsearch/${rowid}`}><Button variant="primary" className="policon" ><FcCalculator /></Button></Link>
         
         {/* <Link to={`/return/${rowid}`} variant="primary" className="policon" onClick={() => setShowDefault(true)}> <Button variant="primary" className=""><GrReturn /></Button> </Link> */}
         
        
        
     
     </> 
     )}},
  
  ]
  // const submit = () => {

  //   confirmAlert({
  //     title: 'تأكيد ! حذف البيانات',
  //     message: 'Are you sure to do this.',
  //     buttons: [
  //       {
  //         label: 'Yes',
  //         onClick:deletedoc
  //       },
  //       {
  //         label: 'No',
  //         onClick: () => alert('لم يتم حذف الوثيقة والقيد التابع لها')
  //       }
  //     ]
  //   });
  // }

  const deletedoc= ()=>{          
    axios.delete(`${url}/deletedoc/${rowid}`)
             .then(()=>{ 
               toast()
              
             })} 

  useEffect(() => {
    (async () => {
    const result = await axios(`${url}/getpol`);
    setData(result.data)
    })();
  }, []);

const factory = patchFilterFactory(filterFactory, (filteredData) => {
 
})

  return (
  
    <div className="App text-wrap">
      <div className='hdr1'>
      <div className='hdr'>
      <Link to={'/sco'}>
      <Button>اضافة وثيقة جديدة<span className='icon'><TiDocumentAdd/></span></Button>
      </Link>
      <Link to={'/endor'}>
      <Button>اضافة ملحق جديد <span className='icon'><TiDocumentAdd/></span></Button>
      </Link>
      <Link to={'/polsearch'}>
      <Button>استعلام عن وثيقة<span className='icon'><FiSearch/></span></Button>
      </Link>
     
      </div>
     <div className='notif'>
     <Totalpolnotif />
      <Renualnotif/>
     </div>
     </div>
      <BootstrapTable className="table table-striped"
       filter={factory() }
        bootstrap4
        keyField="id"
        data={data}
        columns={columns}
        // pagination={pagination}
        hover={true} search={true} 
        
      
      />



    </div>
    
  );
};

export default PolPage2