import React, { useState ,useEffect,useRef} from 'react';
import axios from 'axios'
import moment from 'moment'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import '../Style/PolSearch.css'
import {FcCalculator} from 'react-icons/fc'
import {Link,NavLink,useHistory,useParams } from 'react-router-dom'
import {FcPrint} from 'react-icons/fc'
import {FaFileExcel} from 'react-icons/fa'
import { useReactToPrint } from 'react-to-print';
import ReactExport from "react-export-excel";
import {FormControl,TextField} from '@mui/material';
import { Button, Modal,Col ,Table} from '@themesberg/react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import AddCircleIcon from '@mui/icons-material/AddCircle';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const lurl="http://localhost:3001";
const url="https://alwafi.thesmartlogic.com";
toast.configure()
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
const pagination = paginationFactory({
  page: 1,
  sizePerPage: 10,
  lastPageText: '>>',
  firstPageText: '<<',
  nextPageText: '>',
  prePageText: '<',
  showTotal: true,
  alwaysShowAllBtns: true,
  onPageChange: function (page, sizePerPage) {
    console.log('page', page);
    console.log('sizePerPage', sizePerPage);
  },
  onSizePerPageChange: function (page, sizePerPage) {
    console.log('page', page);
    console.log('sizePerPage', sizePerPage);
  }
});

export const PolSearch = () => {
    const [doc,setDoc]=useState()
    const [Acc,setAcc]=useState([])
    const [comp,setComp]=useState()
    const [accdt,setAccdt]=useState([])
    const [date1,setDate1]=useState()
  const [date2,setDate2]=useState()
  const [msg,setMsg]=useState("")
  const[status,setstatus]=useState('')
    const [showDefault, setShowDefault] = useState(false);
    const handleClose = () => setShowDefault(false);
    var d = Date(Date.now());
   var a = d.toString()
   //var sum=0

   const notify = () => toast.error("هذا الرقم غير موجود في قاعدة البيانات",{position:toast.POSITION.TOP_RIGHT});
  
 
    const polearch= ()=>{
                   
         axios.get(`${url}/polsearch/${doc}`)
                  .then((res)=>{ 
                    setAcc(res.data);
                   
                  })
                
               
                 } 
                 
                 const componentRef = useRef();
                 const handlePrint = useReactToPrint({
                 content: () => componentRef.current,
                    });
                    const componentRef2 = useRef();
                    const handlePrint2 = useReactToPrint({
                    content: () => componentRef2.current,
                       });

                       const columns = [
            
                        {
                          dataField: "pol_no",
                          text: "رقم الوثيقة",
                          sort: true,
                          style: {color: 'red' },
                          align: 'center',
                         /*{filter: textFilter({
                            delay: 0,
                          })
                       } */
                        },
                      
                        {
                          dataField: "doc_type",
                          text: "نوع الوثيقة",
                          sort: true,
                          style: {color: 'red' },
                          align: 'center',
                      
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
                          style: {color: 'black' }
                        
                        },
                        {
                          dataField: "ins_comp",
                         /* filter: textFilter({
                            delay: 0
                          }),*/
                          text: "شركة التأمين",
                          sort: true,
                          style: {color: 'black' },
                          align: 'center'
                        
                        },
                       
                        {
                          dataField: "acc_type",
                          text: "نوع الحساب",
                          sort: true,
                          style: {color: 'black' }
                          
                        },
                        {
                          dataField: "cust_acc",
                          text: " حساب الزبون",
                          sort: true,
                          align: 'center',
                          
                          style: {color: 'black' }
                        },
                        {
                          dataField: "comp_name",
                          text: "اسم الشركة ",
                          sort: true,
                          align: 'center',
                          style: {color: 'black' }
                          
                        },
                        {
                          dataField: "cust_name",
                          text: "اسم الزبون",
                          sort: true,
                          align: 'center',
                          
                        },
                        {
                            dataField:"reg_dt",
                            text: "تاريخ التسجيل",
                            sort: true,
                            style: {color: 'black' },
                            align: 'center',
                            
                            
                          },
                        {
                          dataField: "maj_ins",
                          text: "التأمين الرئيسي",
                          sort: true,
                          style: {color: 'black' }
                          
                        },
                        {
                          dataField: "min_ins",
                          text: "التأمين الفرعي",
                          sort: true,
                          style: {color: 'black' }
                          
                        },
                        {
                            dataField: "total_prem",
                            text: "القسط الكلي شيقل",
                            sort: true,
                            style: {color: 'blue' }
                          
                            
                          },
                          {
                            dataField: "cust_jaw",
                            text: " رقم الجوال",
                            sort: true,
                            style: {color: 'black' }
                            
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
                               <Link to={`/accsearch/${rowid}`}><Button variant="primary" className="policon" ><FcCalculator /></Button></Link>
                                </>  )}},
                      
                      ]
                      
                          
                      const factory = patchFilterFactory(filterFactory, (filteredData) => {
 
                      })    
                      
                   
                        
      return(
        
           <div className="App">
           <div class="    align-items-top">
        <div class="col-md-6">
            <div class="search"> 
             <input type="number" className='sinput form-control'  onChange={(e)=>setDoc(e.target.value)}  placeholder=" ابحث من خلال رقم الوثيقة او الملحق / رقم الحساب"/> 
             <button onClick={polearch} class="btn btn-primary">بحث</button> </div>
             <button className='excle' onClick={handlePrint}><FcPrint/></button>
            
          </div>
           </div>
       
           <BootstrapTable className="table table-striped"
              filter={factory() }
                bootstrap4
                keyField="id"
                data={Acc}
                columns={columns}
              pagination={pagination}
                hover={true} search={true} 
        />
     
        
          </div>
          
    )
}
export default PolSearch