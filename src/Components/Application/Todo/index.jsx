import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Plus } from 'react-feather';
import { Card, CardBody, CardHeader, Col, Container, Input, Row } from 'reactstrap';
import { Breadcrumbs, H5, Btn } from '../../../AbstractElements';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Fade } from 'react-reveal';
import WidgetsWrapper from '../../Dashboard/Default/WidgetsWraper';
import SlotActivation from '../../Dashboard/Default/DashBoardWidgets';
import { fetchSlot } from '../../../api/integrateConfig';
import { useAccount } from 'wagmi'

const TodoContain = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const { address} = useAccount();


  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#myTable' }); // Assuming your table has an id 'myTable'
    doc.save('table_data.pdf');
  };

  // const tableRef = useRef();

  const handleEditClick = (row) => {
    // Handle the edit action for the specific row
    console.log(`Edit clicked for row: ${row.name}`);
    // Add your edit logic here
    // For example, you could open a modal for editing
  };


  // const [data, setData] = useState(
  //   [
  //     { Date: '2005/11/04', Slot: 'Users', Slottype: '$64 (Renew)', transaction: 'user'   },
  //     { Date: '2005/11/04', Slot: 'User', Slottype: '$64 (Renew)', transaction: 'user'   },
  //     { Date: '2005/11/04', Slot: 'User', Slottype: '$64 (New)', transaction: 'user'   },
  //     { Date: '2005/11/10', Slot: 'User', Slottype: '$64 (New)', transaction: 'user'   },
  //     { Date: '2008/11/23', Slot: 'User', Slottype: '$64 (New)', transaction: 'user'   },
  //     { Date: '2005/11/04', Slot: 'User', Slottype: '$64 (Renew)', transaction: 'user'   },
  //     { Date: '2005/11/04', Slot: 'User', Slottype: '$64 (New)', transaction: 'user'   },
  //     { Date: '2005/11/04', Slot: 'User', Slottype: '$64 (Renew)', transaction: 'user'   },
     
  //   ]
  // )
  const [data , setData] = useState([]);
   let filtereddata = data;
  filtereddata.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const [ascendingOrder, setAscendingOrder] = useState(true);



  const fetchData = async ()=>{         // this function returns all slots and is used inside the useeffect
    try{
      // console.log(address + "and the user id is " + localStorage.getItem("userID"))
      let data1 = {
        address : address,
        userId : localStorage.getItem("userID"),   //  in order to get user id from this, user must first go to edit profile section because this is where user ID is set to localsotrage otherwise it might throw error
        startDate : fromDate,
        endDate : toDate 
        // ? toDate : new Date().toISOString().split('T')[0]
      }
      
      const response = await fetchSlot(data1)
      // console.log(`the kst is ${response.result[0].slot}`)
      // for(let i = 0; i<response.result.length; i++){
      //   console.log(` all the slots are : ${response.result[i].slot}`)
      // }
      setData(response.result);    // the array of rsult is then mapped in the table
    }catch(error){
      console.log(`error in fetching data from the backend : ${error.message}`)
    }
  }
useEffect(()=>{        //new addition
  fetchData();
}, [fromDate , toDate])

// useEffect(()=>{
//   fetchData();  
// }, [])


  // const filteredData = data.filter((row) => {
  //   const rowDate = new Date(row.Date);
  //   const fromDateObj = fromDate ? new Date(fromDate) : null;
  //   const toDateObj = toDate ? new Date(toDate) : null;

  //   return (
  //     rowDate >= (fromDateObj || rowDate) &&
  //     rowDate <= (toDateObj || rowDate) &&
  //     row.Date.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // });


  const handlePrint = () => {
    window.print();
  };


  const tableRef = useRef(null);

  const copyTable = () => {
    const range = document.createRange();
    range.selectNode(tableRef.current);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    //   alert('Table copied to clipboard!');
  };


  const downloadTableAsCSV = () => {
    const table = document.getElementById('myTable'); // Assuming your table has an id 'myTable'

    if (!table) {
      console.error('Table not found');
      return;
    }

    const rows = table.querySelectorAll('tr');
    const csvData = [];

    rows.forEach((row) => {
      const rowData = [];
      const cells = row.querySelectorAll('td, th');

      cells.forEach((cell) => {
        rowData.push(cell.innerText);
      });

      csvData.push(rowData.join(','));
    });

    const csvContent = csvData.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'table_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle='Slot Activation' parent='Slot Activation' title='Slot Activation' />
      <Container fluid={true} className='email-wrap bookmark-wrap todo-wrap'>
        <Row className="widget-grid">
          <SlotActivation />

          <Fade top distance='2%' duration={700}>

            <div className='upgrade-package-container' >
              <div className='search-and-button d-flex mt-4' style={{ justifyContent: 'flex-end', marginRight:'40px' }}>
                <div className='buttons'>
                  {/* <button onClick={copyTable}>Copy</button> */}
                  <button onClick={downloadTableAsCSV}>CSV</button>
                  <button onClick={downloadTableAsCSV}>Excel</button>
                  <button onClick={generatePDF}>PDF</button>
                  {/* <button onClick={handlePrint}>Print</button> */}

                </div>

                {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                  Search:-
                 
                  <Input
                    type="text"
                    style={{ width: '200px' }}
                    placeholder="Enter ID,User Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div> */}
              </div>
              {/*  */}


              <hr />


              <div className="table-responsive">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>


                      <h4 className="mb-0"> History</h4>
                      <div className='date-inputs' style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#96979A' }}>
                        from:-
                        <Input
                          type="date"
                          style={{ width: '150px' }}
                          onChange={(e) => setFromDate(e.target.value)}
                        />
                        To:-
                        <Input
                          type="date"
                          style={{ width: '150px' }}

                          onChange={(e) => setToDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="table-responsive">
                      <table id="myTable" className="table table-striped table-bordered" style={{ width: '100%' }}>
                        <thead>
                          <tr>

                            <th >Date & Time </th>
                            <th> Slot</th>
                            <th>Slot type</th>
                            <th>Transation Hash</th>
                            {/* <th>Level</th>
                            <th>Package Type</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {filtereddata.map((row, index) => (
                            <tr key={index}>
                              <td>{new Date(row.time).toLocaleString()}</td>
                              <td>{row.userId}</td>
                              <td>${row.slot}</td>
                              <td>{row.transactionHash}</td>
                              {/* <td>{row.Level}</td>
                              <td>{row.package}</td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </Row>
      </Container>
    </Fragment>
  );
};
export default TodoContain;
