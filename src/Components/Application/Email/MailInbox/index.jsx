import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Container, Input, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../../AbstractElements';
// import DataTable from 'react-data-table-component';
import Email from './Email';
import MailSidebar from './MailSidebar';
import WidgetsWrapper from '../../../Dashboard/Default/WidgetsWraper';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Fade } from 'react-reveal';
import { fetchPackage } from '../../../../api/integrateConfig';
import {useAccount} from 'wagmi'
import { useContext } from 'react';
import MyContext from '../../../../Context/MyContext';



const MailInboxContain = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const {address} = useAccount();


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
  //     { Date: '2005/11/04', Wallet: 'User', transaction: 'user', Amount: '$3740', Remark: '1 Level', package: '$64' },
  //     { Date: '2005/11/04', Wallet: 'User', transaction: 'user', Amount: '$3740', Remark: '2 Level', package: '$64' },
  //     { Date: '2005/11/04', Wallet: 'User', transaction: 'user', Amount: '$3740', Remark: '1 Level', package: '$64' },
  //     { Date: '2005/11/04', Wallet: 'User', transaction: 'user', Amount: '$3740', Remark: '3 Level', package: '$64' },
  //     { Date: '2005/11/04', Wallet: 'User', transaction: 'user', Amount: '$3740', Remark: '2 Level', package: '$64' },
  //     { Date: '2005/11/04', Wallet: 'User', transaction: 'user', Amount: '$3740', Remark: '1 Level', package: '$64' },
  //     { Date: '2005/11/04', Wallet: 'User', transaction: 'user', Amount: '$3740', Remark: '3 Level', package: '$64' },
  //   ]
  // )

  const [data , setData] = useState([])
  const {userData} = useContext(MyContext);
  const [ascendingOrder, setAscendingOrder] = useState(true);

  const fetchAllPackages = async()=>{        //this function returns all the packages and is used inside the useEffect
    // const {address,userId,startDate, endDate} = req.body;
    if(!userData.userId) return;
    try{
      let data1 = {
        address : address,
        userId : userData.userId, // only works if the user has first visited the edi profile section
        startDate : fromDate,
        endDate : toDate 
        // ? toDate : new Date().toISOString().split('T')[0] 
      }
      console.log(fromDate)
      console.log(toDate);
        const response  = await fetchPackage(data1);
        console.log(`response recieved is : ${response.message}`)
        console.log(`whole response is : ${response}`)
        console.log(response)
        setData(response.result);        // the data is then mapped in the table
    }catch(error){
      console.log(`error in fetch all packages when hit from the front end : ${error.message}`)
    }
  }

  useEffect(()=>{
    fetchAllPackages();
  }, [fromDate, toDate])

  let filtereddata = data;
  filtereddata.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


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

  // const packages = [
  //   { amount: 20, type: 'Basic' },
  //   { amount: 30, type: 'Standard' },
  //   { amount: 80, type: 'Premium' },
  // ];

  // const handlePackageClick = (amount) => {
  //   console.log(`Selected package with amount: $${amount}`);
  // };
  return (

    <Fragment>
      <Breadcrumbs mainTitle="Upgrade Package" parent="Upgrade Package" title="Upgrade Package" />
      <Container fluid={true}>
        <Row className="widget-grid">
          <WidgetsWrapper />
          <Fade top distance='2%' duration={700}>

            <div className='upgrade-package-container' >
              <div className='search-and-button d-flex mt-4' style={{ justifyContent: 'flex-end', marginRight:'20px' }}>
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

                            <th >Date & Time</th>
                            <th>Package Name</th>
                            <th>Transation Hash</th>
                            {/* <th> Wallet Address From</th>
                            <th>Amount</th>
                            <th>Remark</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {data.length > 0 ? 
                          data.map((row, index) => (
                            <tr key={index}>
                              <td>{new Date(row.time).toLocaleString()}</td>
                              <td>{row.package}</td>
                              <td>{row.transactionHash}</td>
                              {/* <td>{row.Wallet}</td>
                              <td>{row.Amount}</td>
                              <td>{row.Remark}</td> */}
                            </tr>
                          ))
                          :
                          <tr>
                            <td colSpan={3}>No Data Found!</td>
                          </tr>
                        }
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
export default MailInboxContain;
