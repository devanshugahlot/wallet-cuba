import BrandShipping from './BrandShipping';
import ImageSlider from './ImageSilder';
import ProductDetails from './ProductDetails';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Card, CardBody, Col, Container, Input, Row } from 'reactstrap';
import { Fragment } from 'react';
import Tablet from './Tabsets';
import { Breadcrumbs } from '../../../../AbstractElements';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-reveal';
import UserDataSection from '../../../Tables/DataTable/DataTableComponent';

const ProductPageContain = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFromUserName, setSearchFromUserName] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const navigate = useNavigate();

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#myTable' }); // Assuming your table has an id 'myTable'
    doc.save('table_data.pdf');
  };

  const handleEditClick = (row) => {
    console.log(`Edit clicked for row: ${row.name}`);
  };

  const [data, setData] = useState(
    [
      { sno: '1', name: 'Tiger Nixon', name: '	System Architect', id: '	#101', age: '61', selery: '	$320,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2023/04/12' },

      { sno: '2', name: 'Hermione Butler', name: 'Regional Director', id: '	#102', age: '64', selery: '	$327,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2023/04/20' },

      { sno: '3', name: 'Hermione Jonshan', name: 'Regional Director', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2024/04/12' },

      { sno: '4', name: 'Hermione Jonshan', name: 'Regional Director', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2001/04/25' }

      , { sno: '5', name: 'Hermione Jonshan', name: 'Regional Director', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2021/04/25' },

      { sno: '6', name: 'Hermione Jonshan', name: 'Regional Director', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2001/04/25' },

      { sno: '7', name: 'Hermione Jonshan', name: 'Regional Director', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2007/09/15' },

      { sno: '8', name: 'Hermione Jonshan', name: 'Regional Director', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2001/04/25' },

      { sno: '9', name: 'Hermione Jonshan', name: 'Regional Director', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2005/11/14' }
    ]
  )

  const [ascendingOrder, setAscendingOrder] = useState(true);

  const handleDateHeaderClick = () => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.Date);
      const dateB = new Date(b.Date);
      return ascendingOrder ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });

    setData(sortedData);
    setAscendingOrder(!ascendingOrder);
  };

  const filteredData = data.filter((row) => {
    const rowDate = new Date(row.Date);
    const fromDateObj = fromDate ? new Date(fromDate) : null;
    const toDateObj = toDate ? new Date(toDate) : null;

    return (
      rowDate >= (fromDateObj || rowDate) &&
      rowDate <= (toDateObj || rowDate) &&
      row.Date.toLowerCase().includes(searchTerm.toLowerCase()) &&
      row.name.toLowerCase().includes(searchFromUserName.toLowerCase())
    );
  });

  const tableRef = useRef(null);

  const copyTable = () => {
    const range = document.createRange();
    range.selectNode(tableRef.current);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  };

  const handlePrint = () => {
    window.print();
};

  const downloadTableAsCSV = () => {
    const table = document.getElementById('myTable');

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
      <Breadcrumbs parent='TransferHistory' title='Transfer History' mainTitle='Transfer History' />
      <Container fluid={true}>
        <Fade top distance='2%' duration={700}>
          <div className='search-and-button d-flex mt-4' style={{ justifyContent: 'space-between' }}>
            <div className='buttons'>

              <button onClick={copyTable}>Copy</button>
              <button onClick={downloadTableAsCSV}>CSV</button>
              <button onClick={downloadTableAsCSV}>Excel</button>
              <button onClick={generatePDF}>PDF</button>
              <button onClick={handlePrint}>Print</button>
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              Search From User Name:-
              <Input
                type="text"
                style={{ width: '200px' }}
                placeholder="Enter From User Name"
                value={searchFromUserName}
                onChange={(e) => setSearchFromUserName(e.target.value)}
              />
            </div>
          </div>
          <hr />
          <div className="table-responsive">
            <div className="card">
              <div className="card-body">
                <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 className="mb-0">Transfer History</h4>
                  <div className='date-inputs' style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    from:-
                    <Input type="date" onChange={(e) => setFromDate(e.target.value)} />
                    To:-
                    <Input type="date" onChange={(e) => setToDate(e.target.value)} />
                  </div>
                </div>
                <hr />
                <div className="table-responsive">
                  <table id="myTable" className="table table-striped table-bordered" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>S.NO</th>
                        <th>From User ID</th>
                        <th>From User Name</th>
                        <th>From Wallet Address</th>
                        <th>To User ID</th>
                        <th>To User Name</th>
                        <th>To Wallet Address</th>
                        <th>Amount(Send / Receive)</th>
                        <th onClick={handleDateHeaderClick}>
                          Date{' '}
                          {ascendingOrder ? <FaSortDown /> : <FaSortUp />}
                        </th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((row, index) => (
                        <tr key={index}>
                          <td>{row.sno}</td>
                          <td>{row.id}</td>
                          <td>{row.name}</td>
                          <td>{row.selery}</td>
                          <td>{row.age}</td>
                          <td>{row.gender}</td>
                          <td>{row.time}</td>
                          <td>{row.time}</td>
                          <td>{row.Date}</td>
                          <td>{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Container>
    </Fragment>
  );
};

export default ProductPageContain;






// const [data, setData] = useState(
//   [
//     { sno: '1', name: 'Tiger Nixon', name: '	System Architect', id: '	#101', age: '61', selery: '	$320,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2023/04/12' },

//     { sno: '2', name: 'Hermione Butler', name: 'Regional Director', id: '	#102', age: '64', selery: '	$327,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2023/04/20' },

//     { sno: '3', name: 'Hermione Jonshan', name: 'Regional Director', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2024/04/12' },

//     { sno: '4', name: 'Hermione Jonshan', name: 'Regional Director', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2001/04/25' }

//     , { sno: '5', name: 'Hermione Jonshan', name: 'Regional Director', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2021/04/25' },

//     { sno: '6', name: 'Hermione Jonshan', name: 'Regional Director', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2001/04/25' },

//     { sno: '7', name: 'Hermione Jonshan', name: 'Regional Director', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2007/09/15' },

//     { sno: '8', name: 'Hermione Jonshan', name: 'Regional Director', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2001/04/25' },

//     { sno: '9', name: 'Hermione Jonshan', name: 'Regional Director', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2005/11/14' }
//   ]
// )