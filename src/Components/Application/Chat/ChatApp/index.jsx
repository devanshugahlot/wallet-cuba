import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Breadcrumbs } from '../../../../AbstractElements';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button, Input, Modal, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-reveal';
import { useAccount } from 'wagmi'
import { fetchUsersList } from '../../../../api/integrateConfig';

const ChatAppContain = () => {
  const { address} = useAccount();
  const [startDate , setStartDate] = useState(new Date("2000-01-01"));
  const [endDate , setEndDate] = useState(new Date("3000-01-01"));
  const [data , setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchFromUserName, setSearchFromUserName] = useState('');
  // const [fromDate, setFromDate] = useState('');
  // const [toDate, setToDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const navigate = useNavigate();


  useEffect(()=>{
    const fetchUserDetails = async()=>{
      // console.log(endDate)
      try{
      let data1 = {
        startDate : startDate,
        endDate : endDate
      }
      const response = await fetchUsersList(data1);
      setData(response.allUsers);
    }catch(error){
      console.log(`error in index file of the table `)
    }

    }
    fetchUserDetails();
  }, [startDate , endDate ])

  let filteredData = data;
  if (searchFromUserName !== '') {
    filteredData = data.filter(user => user.name.toLowerCase().includes(searchFromUserName.toLowerCase()));
  }

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
  //     { sno: '1', name: 'Tiger Nixon', id: '	#101', SponserID: '61', UserWalletAddress: '	$320,800', SponserWalletAddress: 'male', time: '21:37', wallet: '$2125', joindate: '2023/02/12', Date: '2023/04/12',
  //   ReferralIncome:'$12', LevelIncome:'$22', PackageIncome:'$25', SlotIncome:'$20,', TotalIncome:'$5' },
  //   ]
  // )
  //  WalletAddress: 'New York',

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

  const statusOptions = ['Active', 'Inactive', 'Block'];

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
  //     row.name.toLowerCase().includes(searchFromUserName.toLowerCase())
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
    setStartDate(new Date("2000-01-01"))
    setEndDate(new Date("3000-01-01"))
    // setFromDate('');
    // setToDate('');
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle='All User' parent='UserSection' title='All User' />
      <Container fluid={true}>
        <Fade top distance='2%' duration={700}>
          <div className='search-and-button d-flex mt-4' style={{ justifyContent: 'space-between' }}>
            <div className='buttons d-flex'>
              <button onClick={copyTable}>Copy</button>
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              Search by Status:-
              <Input
                type='select'
                style={{ width: '150px', marginLeft: '10px' }}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value=''>All</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Input>
            </div>
          </div>
          <hr />
          <div className='table-responsive'>
            <div className='card'>
              <div className='card-body'>
                <div className='card-title' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 className='mb-0'>All User</h4>
                  <div className='date-inputs' style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#96979A' }}>
                    from:-
                    <Input type='date' onChange={(e) => setStartDate(e.target.value)} />
                    To:-
                    <Input type='date' onChange={(e) => setEndDate(e.target.value)} />
                  </div>
                </div>
                <hr />
                <div className='table-responsive'>
                  <table id='myTable' className='table table-striped table-bordered' style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>S.NO</th>
                        <th> User Name</th>
                        <th> User ID</th>
                        <th>User Wallet Address</th>
                        <th>Sponser Wallet Address</th>
                        {/* <th>Sponser ID</th> */}
                        {/* <th>Wallet Address</th> */}
                        {/* <th>Wallet Amount</th> */}
                        {/* <th>Time</th> */}
                        <th >Referral Income</th>
                        <th >Level Income</th>
                        <th >Package Upgrade Income</th>
                        <th >Slot Income</th>
                        <th >Total Income</th>
                        <th >Date & Time</th>
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((row, index) => (            // to be edited  ....index+1 is set as td for S.no
                        <tr key={index}>
                          <td>{index+1}</td>           
                          <td>{row.name}</td>
                          <td>{row.userId}</td>
                          <td>{row.address}</td>
                          <td>{row.referBy}</td>
                          {/* <td>row.SponserIDfill later</td> */}
                          {/* <td>{row.wallet}</td> */}
                          {/* <td
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleWalletClick(row.WalletAddress)}
                          >
                            {row.WalletAddress}
                          </td> */}
                          {/* <td>{row.time}</td> */}
                          <td>{row.refferalIncome}</td>
                          <td>{row.levelIncome}</td>
                          <td>{row.packageIncome}</td>
                          <td>{row.slotIncome}</td>
                          <td>{row.slotIncome+row.packageIncome+row.levelIncome+row.refferalIncome}</td>
                          <td>{new Date(row.createdAt).toLocaleString()}</td>
                          {/* <td>
                            <Button color='primary' onClick={() => handleEditClick(row)}>
                              Edit
                            </Button>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
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

export default ChatAppContain;
