import React, {useMemo,useState,useEffect} from 'react'
import axios from "axios";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Button } from 'react-bootstrap';
import {Link,NavLink,useNavigate} from 'react-router-dom'
import '../Style/PolPage2.css'
import { FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import {FcCalculator} from 'react-icons/fc'
import ShowPage from './ShowPage'


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
  sizePerPage: 12,
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






const PolPage2 = () => {
  const [data, setData] = useState([]);
  const [pol, setPol] = useState([]);
  const [databyid, setDatabyid] = useState([]);
  let history = useNavigate();

  const columns = [
    {
      dataField: "id",
      text: "الرقم",
      sort: true,
     /*{filter: textFilter({
        delay: 0,
      })
   } */
    },
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
      dataField: "cust_name",
      text: "اسم الزبون",
      sort: true,
      
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
      formatter: (cell, row, rowIndex, formatExtraData) => { 
        const rowid = row.id;
        
        return (  
          
          <> 
         <Link to={`/show/${rowid}`}> <span className='policon'><FaEye /></span> </Link>
         <Link to={`/edit/${rowid}`}> <span className='policon'><FaRegEdit /></span></Link>
         <Link to={`/acc/${rowid}`}> <span className='policon'><FcCalculator /></span></Link>
          </> 
          
        )
      }
  },
  
  ]
  




    
useEffect(() => {
  (async () => {
    const result = await axios("http://localhost:3001/getpol");
    setData(result.data);
   
  })();
}, []);





const factory = patchFilterFactory(filterFactory, (filteredData) => {
 
})

  return (
  
    <div className="App">
       <Link to={'/sco'}>
      <Button>+ اضافة وثيقة جديدة</Button>
      </Link>
      <BootstrapTable className="table table-striped"
       filter={factory() }
        bootstrap4
        keyField="id"
        data={data}
        columns={columns}
        pagination={pagination}
        hover={true} search={true} 
        
      
      />

    </div>
    
  );
};

export default PolPage2