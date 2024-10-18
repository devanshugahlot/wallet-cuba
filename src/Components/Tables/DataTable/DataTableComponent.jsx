import React, { useRef, useState } from 'react';
import './UserDataSection.css'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-reveal';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';




const UserDataSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const navigate = useNavigate()


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


    const [data, setData] = useState(
        [
            { id: '1', name: 'Tiger Nixon', position: '	System Architect', office: '	Edinburgh', age: '61', selery: '	$320,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2023/04/12', status: 'Pending' },

            { id: '2', name: 'Hermione Butler', position: 'Regional Director', office: '	London', age: '64', selery: '	$327,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2023/04/20', status: 'Pending' },

            { id: '3', name: 'Hermione Jonshan', position: 'Regional Director', office: '	New York', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2024/04/12', status: 'Pending' },

            { id: '4', name: 'Hermione Jonshan', position: 'Regional Director', office: '	New York', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2001/04/25', status: 'Pending' }

            , { id: '5', name: 'Hermione Jonshan', position: 'Regional Director', office: '	New York', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2021/04/25', status: 'Pending' },

            { id: '6', name: 'Hermione Jonshan', position: 'Regional Director', office: '	New York', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2001/04/25', status: 'Pending' },

            { id: '7', name: 'Hermione Jonshan', position: 'Regional Director', office: '	New York', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2007/09/15', status: 'Pending' },

            { id: '8', name: 'Hermione Jonshan', position: 'Regional Director', office: '	New York', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2001/04/25', status: 'Pending' },

            { id: '9', name: 'Hermione Jonshan', position: 'Regional Director', office: '	New York', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date: '2005/11/14', status: 'Pending' }
        ]
    )

    const [ascendingOrder, setAscendingOrder] = useState(true);


    const handleDateHeaderClick = () => {
        const sortedData = [...data].sort((a, b) => {
            const dateA = new Date(a.Date);
            const dateB = new Date(b.Date);

            // Use getTime() to compare dates
            return ascendingOrder ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        });

        setData(sortedData);
        setAscendingOrder(!ascendingOrder);
    };



    const filteredData = data.filter((row) =>
        row.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <>
            <Fade top distance='2%' duration={700}>
                {/* <div></div> */}
                <div className='search-and-button d-flex mt-4' style={{ justifyContent: 'space-between' }}>
                    <div className='buttons'>
                        {/* <button onClick={copyTable}>Copy</button> */}
                        <button onClick={downloadTableAsCSV}>CSV</button>
                        <button onClick={downloadTableAsCSV}>Excel</button>
                        <button onClick={generatePDF}>PDF</button>
                        {/* <button onClick={handlePrint}>Print</button> */}

                    </div>

                    <div>
                        Search:-
                        <input type="text" placeholder='enter Date' value={searchTerm} style={{ border: '1px solid #C7C8C9' }}
                            onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>
                {/*  */}


                <hr />


                <div className="table-responsive">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>


                                <h4 className="mb-0">All Deposite</h4>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    from:-
                                    <input type="date" onChange={(e) => setFromDate(e.target.value)} />
                                    To:-
                                    <input type="date" onChange={(e) => setToDate(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <div className="table-responsive">
                                <table id="myTable" className="table table-striped table-bordered" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>S.NO</th>
                                            <th>From</th>
                                            <th>Wallet Address</th>
                                            <th>Amount</th>
                                            <th>Transcation Hash</th>
                                            <th>Remark</th>
                                            <th onClick={handleDateHeaderClick}>
                                                Date{' '}
                                                {ascendingOrder ? <FaSortDown /> : <FaSortUp />}
                                            </th>
                                            <th>Time</th>
                                            <th>Status</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.id}</td>
                                                <td>{row.office}</td>
                                                <td>{row.position}</td>
                                                <td>{row.selery}</td>
                                                <td>{row.age}</td>
                                                <td>{row.gender}</td>
                                                <td>{row.Date}</td>
                                                <td>{row.time}</td>
                                                <td>{row.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </Fade>

        </>
    )
}

export default UserDataSection
