import React, { Fragment, useEffect, useRef, useState } from 'react';
import PrintComponent from './Print';
import { Breadcrumbs } from '../../../../AbstractElements';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button, Container, Input, Modal } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-reveal';
import { FaLess } from 'react-icons/fa6';
import {useAccount} from 'wagmi'
import { fetchIncomeDetails } from '../../../../api/integrateConfig';

const InvoiceContain = () => {
  const {address} = useAccount();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFromUserName, setSearchFromUserName] = useState('');
  const [fromDate, setFromDate] = useState(new Date("2000-01-01"));
  const [toDate, setToDate] = useState(new Date("3000-01-01"));
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedRow, setEditedRow] = useState(null);

  const [allIncome, setAllincome] = useState(false)
  const [refferal, setRefferal] = useState(false)
  const [levelIncome, setLevelIncome] = useState(false)
  const [packageincome, setPackageincome] = useState(false)
  const [slotincome, setSlotincome] = useState(false)

  const [incomeType , setIncomeType] = useState('all');
  const [data , setData] = useState([]);

  // const navigate = useNavigate();

  const handleWalletClick = (walletAddress) => {
    setSelectedWallet(walletAddress);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#myTable' });
    doc.save('table_data.pdf');
  };

  const handleEditClick = (row) => {
    setEditedRow(row);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    // Implement logic to save changes to the editedRow data
    console.log('Saving changes:', editedRow);
    // Close the modal
    setIsEditModalOpen(false);
    const updatedData = data.map((row) =>
      row.sno === editedRow.sno ? { ...row, ...editedRow } : row
      // Implement logic to save changes to the editedRow data
      // Here, you need to update the corresponding row in the data array
    );
    setData(updatedData);
    // Close the modal
    setIsEditModalOpen(false);

    console.log('Updated Data:', updatedData);

  };



  // const [data, setData] = useState(
  //   [
  //     { sno: '1', ToWalletAddress: 'Tiger Nixonss', id: '	#101', FromWalletAddress: '	$320,800', FromUserID: '456256', Incometype: '21:37', Amount: '$2125', Date: '2023/04/12' },
  //   ]
  // )

  // const [allincomedata, setAllincomedata] = useState(
  //   [
  //     { sno: '1', name: '	System Architect', id: '	#101', age: '61', selery: '	$320,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', WalletAddress: 'New York', wallet: '$2125', Date: '2023/04/12' },

  //     { sno: '2', name: 'radhe radhe', id: '	#102', age: '64', selery: '	$327,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', WalletAddress: 'London', wallet: '$2125', Date: '2023/04/20' },

  //     { sno: '3', name: 'radhe radhe', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', WalletAddress: 'New York', wallet: '$2125', Date: '2024/04/12' },

  //     { sno: '4', name: 'radhe radhe', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', WalletAddress: 'New York', wallet: '$2125', Date: '2001/04/25' }

  //     , { sno: '5', name: 'radhe radhe', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', WalletAddress: 'New York', wallet: '$2125', Date: '2021/04/25' },

  //     { sno: '6', name: 'radhe radhe', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', WalletAddress: 'New York', wallet: '$2125', Date: '2001/04/25' },

  //     { sno: '7', name: 'radhe radhe', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', WalletAddress: 'New York', wallet: '$2125', Date: '2007/09/15' },

  //     { sno: '8', name: 'radhe radhe', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', WalletAddress: 'New York', wallet: '$2125', Date: '2001/04/25' },

  //     { sno: '9', name: 'radhe radhe', id: '	#103', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', WalletAddress: 'New York', wallet: '$2125', Date: '2005/11/14' }
  //   ]
  // )

  // const [levelincomedata, setLevelincomedata] = useState(
  //   [
  //     { sno: '1', ToWalletAddress: 'Tiger Nixon', id: '	#101', FromWalletAddress: '	$320,800', FromUserID: '456256', Incometype: '21:37', Amount: '$2125', Date: '2023/04/12', Remark:'Level 1' },
  //     { sno: '1', ToWalletAddress: 'Tiger Nixon', id: '	#101', FromWalletAddress: '	$320,800', FromUserID: '456256', Incometype: '21:37', Amount: '$2125', Date: '2023/04/12', Remark:'Level 1' },
  //     { sno: '1', ToWalletAddress: 'Tiger Nixon', id: '	#101', FromWalletAddress: '	$320,800', FromUserID: '456256', Incometype: '21:37', Amount: '$2125', Date: '2023/04/12', Remark:'Level 1' },
  //   ]
  // )

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

  const statusOptions = ['Renew'];

  // const filteredData = data.filter((row) => {
  //   const rowDate = new Date(row.Date);
  //   const fromDateObj = fromDate ? new Date(fromDate) : null;
  //   const toDateObj = toDate ? new Date(toDate) : null;

  //   const statusFilter =
  //     selectedStatus === '' ? true : row.status.toLowerCase() === selectedStatus.toLowerCase();

  //   return (
  //     statusFilter &&
  //     rowDate >= (fromDateObj || rowDate) &&
  //     rowDate <= (toDateObj || rowDate) &&
  //     row.Date.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //     row.ToWalletAddress.toLowerCase().includes(searchFromUserName.toLowerCase())
  //   );
  // });

  // const allIncomedata1 = allincomedata.filter((row) => {
  //   const rowDate = new Date(row.Date);
  //   const fromDateObj = fromDate ? new Date(fromDate) : null;
  //   const toDateObj = toDate ? new Date(toDate) : null;

  //   const statusFilter =
  //     selectedStatus === '' ? true : row.status.toLowerCase() === selectedStatus.toLowerCase();

  //   return (
  //     statusFilter &&
  //     rowDate >= (fromDateObj || rowDate) &&
  //     rowDate <= (toDateObj || rowDate) &&
  //     row.Date.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //     row.name.toLowerCase().includes(searchFromUserName.toLowerCase())
  //   );
  // });

  // const levelincomedata1 = levelincomedata.filter((row) => {
  //   const rowDate = new Date(row.Date);
  //   const fromDateObj = fromDate ? new Date(fromDate) : null;
  //   const toDateObj = toDate ? new Date(toDate) : null;

  //   const statusFilter =
  //     selectedStatus === '' ? true : row.status.toLowerCase() === selectedStatus.toLowerCase();

  //   return (
  //     statusFilter &&
  //     rowDate >= (fromDateObj || rowDate) &&
  //     rowDate <= (toDateObj || rowDate) &&
  //     row.Date.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //     row.ToWalletAddress.toLowerCase().includes(searchFromUserName.toLowerCase())
  //   );
  // });

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

  const handleReset = () => {
    setSearchFromUserName('');
    setSelectedStatus('');
    setFromDate(new Date("2000-01-01"));
    setToDate(new Date("3000-01-01"));
    setIncomeType('all')
  };

  let filteredData = data;

  if (incomeType == 'all') {
    const frm = new Date(fromDate);
    const too = new Date(toDate);
    filteredData = data.filter(
      transaction => 
        new Date(transaction.createdAt) >= frm &&
        new Date(transaction.createdAt) <= too
    );
  }
  if (incomeType == 'Package upgrade income') {
    const frm = new Date(fromDate)
    const too = new Date(toDate)
    filteredData = data.filter(
      transaction => 
        transaction.incomeType === 'Package upgrade income' &&
        new Date(transaction.createdAt) >= frm &&
        new Date(transaction.createdAt) <= too
    );
  }
  if (incomeType == 'Slot income') {
    const frm = new Date(fromDate)
    const too = new Date(toDate)
    filteredData = data.filter(
      transaction => 
        transaction.incomeType === 'Slot income' &&
        new Date(transaction.createdAt) >= frm &&
        new Date(transaction.createdAt) <= too
    );
  }
  if (incomeType == 'Referral income') {
    const frm = new Date(fromDate)
    const too = new Date(toDate)
    filteredData = data.filter(
      transaction => 
        transaction.incomeType === 'Referral income' &&
        new Date(transaction.createdAt) >= frm &&
        new Date(transaction.createdAt) <= too
    );
  }
  if(incomeType == 'Level income'){
    const frm = new Date(fromDate)
    const too = new Date(toDate)
    filteredData = data.filter(
      transaction => 
        transaction.incomeType === 'Level income' &&
        new Date(transaction.createdAt) >= frm &&
        new Date(transaction.createdAt) <= too
    );
  }

  

  useEffect(()=>{
    const fetchIncomeData =async()=>{
      try{
        let data = {
          address : address
        }
        const allIncomeDetailsOfTeam = await fetchIncomeDetails(data);
        console.log(`successfully gotten data`);
        console.log(allIncomeDetailsOfTeam)
        setData(allIncomeDetailsOfTeam.teamTransactions);
        // setIncomeType('All');

      }catch(error){
        console.log(`error in fetching income data : ${error.message}`);
      }
    }
    fetchIncomeData();
  }, [address , incomeType, fromDate, toDate])

  return (
    <Fragment>
      {/* <Breadcrumbs parent='Income Report' title='My Team Income' mainTitle='My Team Income' /> */}
      {/* <PrintComponent /> */}
      <Container fluid={true}>
        <Fade top distance='2%' duration={700}>
          <div className='search-and-button d-flex mt-4' style={{ justifyContent: 'space-between' }}>
            <div className='buttons d-flex'>
              {/* <button onClick={copyTable}>Copy</button> */}
              <button onClick={downloadTableAsCSV}>CSV</button>
              <button onClick={downloadTableAsCSV}>Excel</button>
              <button onClick={generatePDF}>PDF</button>
              <button onClick={handlePrint}>Print</button>
              <button onClick={handleReset}>Reset</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              Search From User Name:-
              <Input
                type='text'
                style={{ width: '200px' }}
                placeholder='Enter From User Name'
                value={searchFromUserName}
                onChange={(e) => setSearchFromUserName(e.target.value)}
              />
            </div>
            {/* <div style={{ display: 'flex', alignItems: 'center' }}>
              Search by Status:-
              <Input
                type='select'
                style={{ width: '150px', marginLeft: '10px' }}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value=''>Main </option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Input>
            </div> */}
          </div>
          <section>

            {/* const [refferal , setRefferal] = useState(false)
  const [levelIncome , setLevelIncome] = useState(false)
  const [packageincome , setPackageincome] = useState(false)
  const [slotincome , setSlotincome] = useState(false) */}

            <div className='buttons five-buttons' style={{
              display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
              margin: '20px 0px'
            }}>
              <button onClick={() => {
                // setAllincome(true);
                // setRefferal(false);
                // setLevelIncome(false);
                // setPackageincome(false);
                // setSlotincome(false)
                setIncomeType('all');
                console.log("i am clicked")
              }} >
                All Income
              </button>
              <button onClick={() => {
                // setAllincome(false);
                // setRefferal(true);
                // setLevelIncome(false);
                // setPackageincome(false);
                // setSlotincome(false);
                console.log("refferal income clicked")
                setIncomeType('Referral income');
              }} >
                Referral Income
              </button>
              <button onClick={() => {
                // setAllincome(false);
                // setRefferal(false);
                // setLevelIncome(true);
                // setPackageincome(false);
                // setSlotincome(false)
                setIncomeType('Level income');
              }} >
                Level Income
              </button>
              <button onClick={() => {
                // setAllincome(false);
                // setRefferal(false);
                // setLevelIncome(false);
                // setPackageincome(true);
                // setSlotincome(false)
                setIncomeType('Package upgrade income');
              }} >
                package upgrade Income
              </button>
              <button onClick={() => {
                // setAllincome(false);
                // setRefferal(false);
                // setLevelIncome(false);
                // setPackageincome(false);
                // setSlotincome(true)
                setIncomeType('Slot income')
              }} >
                slot Income
              </button>
            </div>
          </section>
          <hr />
          <div className='table-responsive'>
            <div className='card'>
              <div className='card-body'>
                <div className='card-title' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 className='mb-0 '>My Team Income</h4>
                  <div className='date-inputs' style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#96979A' }}>
                    from:-
                    <Input type='date' onChange={(e) => setFromDate(e.target.value)} />
                    To:-
                    <Input type='date' onChange={(e) => setToDate(e.target.value)} />
                  </div>
                </div>
                <hr />
                <div className='table-responsive'>
                  <table id='myTable' className='table table-striped table-bordered' style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>S.NO</th>
                        <th>To User ID </th>
                        <th>To  wallet address</th>
                        <th>From User ID </th>
                        <th>From wallet address </th>
                        <th>Income Type</th>
                        <th>Amount</th>
                        <th>Date & Time</th>
                        {/* <th>Package Upgrade Income</th>
                        <th>Slot Income</th>
                        <th>Total Income</th> */}
                        {/* <th>Joinin Date</th> */}
                        {/* <th onClick={handleDateHeaderClick}>
                          Date{' '}
                          {ascendingOrder ? <FaSortDown /> : <FaSortUp />}
                        </th> */}
                        {/* <th>Action</th> */}
                        {
                          // console.log(levelIncome)

                        }
                        {levelIncome && <th>Remark</th>}
                      </tr>
                    </thead>
                    
                      <tbody>
                        {filteredData.map((row, index) => (
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td>{row.toUserId}</td>
                            <td>{row.toAddress}</td>
                            {/* <td
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleWalletClick(row.WalletAddress)}
                            >
                              {row.WalletAddress}
                            </td> */}
                            <td>{row.fromUserId}</td>
                            <td>{row.fromAddress}</td>
                            <td>{row.incomeType}</td>
                            <td>{row.amount}</td>
                            <td>{new Date(row.createdAt).toLocaleString()}</td>
                            {/* <td>{row.age}</td>
                            <td>{row.gender}</td> */}
                          </tr>
                        ))}
                      </tbody>
                    

                    {/* {
                      !jh && !lll &&!okj &&! ldf !jdsflkj && ()
                    } */}
                    {/* {allIncome && (
                      <tbody>
                        {allIncomedata1.map((row, index) => (
                          <tr key={index}>
                            <td>{row.sno}</td>
                            <td>{row.name}</td>
                            <td>{row.id}</td>
                            <td>{row.selery}</td>
                            <td>{row.gender}</td>
                            <td>{row.time}</td>
                            <td>{row.Date}</td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                    {refferal && (
                      <tbody>
                        {filteredData.map((row, index) => (
                          <tr key={index}>
                            <td>{row.sno}</td>
                            <td>{row.name}</td>
                            <td>{row.id}</td>
                            <td>{row.selery}</td>
                            <td>{row.gender}</td>
                            <td>{row.time}</td>
                            <td>{row.Date}</td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                    {levelIncome && (

                      <tbody>
                        {levelincomedata1.map((row, index) => (
                          <tr key={index}>
                            <td>{row.sno}</td>
                            <td>{row.ToWalletAddress}</td>
                            <td>{row.FromWalletAddress}</td>
                            <td>{row.id}</td>
                            <td>{row.FromUserID}</td>
                            <td>{row.Incometype}</td>
                            <td>{row.Amount}</td>
                            <td>{row.Date}</td>
                            <td>{row.Remark}</td>
                          </tr>
                        ))}
                      </tbody>
                    )}

                    {packageincome && (
                      <tbody>
                        {filteredData.map((row, index) => (
                          <tr key={index}>
                            <td>{row.sno}</td>
                            <td>{row.name}</td>
                            <td>{row.id}</td>
                            <td>{row.selery}</td>
                            <td>{row.gender}</td>
                            <td>{row.time}</td>
                            <td>{row.Date}</td>
                          </tr>
                        ))}
                      </tbody>
                    )}

                    {slotincome && (
                      <tbody>
                        {filteredData.map((row, index) => (
                          <tr key={index}>
                            <td>{row.sno}</td>
                            <td>{row.name}</td>
                            <td>{row.id}</td>
                            <td>{row.selery}</td>
                            <td>{row.gender}</td>
                            <td>{row.time}</td>
                            <td>{row.Date}</td>
                          </tr>
                        ))}
                      </tbody>
                    )}*/}
                  </table> 
                </div>
                {selectedWallet && (
                  <Modal isOpen={true} toggle={() => setSelectedWallet(null)}>
                    <div className='modal-header'>
                      <h5 className='modal-title'>Wallet Details</h5>
                      <button type='button' className='close' onClick={() => setSelectedWallet(null)}>
                        <span aria-hidden='true'>&times;</span>
                      </button>
                    </div>
                    <div className='modal-body'>
                      <p>Details for Wallet: {selectedWallet}</p>
                    </div>
                    <div className='modal-footer'>
                      <Button color='secondary' onClick={() => setSelectedWallet(null)}>
                        Close
                      </Button>
                    </div>
                  </Modal>
                )}
                {editedRow && (
                  <Modal isOpen={isEditModalOpen} toggle={() => setIsEditModalOpen(false)}>
                    <div className='modal-header'>
                      <h5 className='modal-title'>Edit User Details</h5>
                      <button type='button' className='close' onClick={() => setIsEditModalOpen(false)}>
                        <span aria-hidden='true'>&times;</span>
                      </button>
                    </div>
                    <div className='modal-body'>
                      <Input
                        type='text'
                        value={editedRow ? editedRow.name : ''}
                        onChange={(e) => setEditedRow({ ...editedRow, name: e.target.value })}
                      />
                      {/* Add more input fields as needed */}
                    </div>
                    <div className='modal-footer'>
                      <Button color='primary' onClick={handleSaveEdit}>
                        Save Changes
                      </Button>
                      <Button color='secondary' onClick={() => setIsEditModalOpen(false)}>
                        Close
                      </Button>
                    </div>
                  </Modal>
                )}
              </div>
            </div>
          </div>
        </Fade>
      </Container>

    </Fragment>
  );
};
export default InvoiceContain;
