import React, { useRef, useState } from 'react';

import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-reveal';



const Approved = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate()

    // const tableRef = useRef();

    const handleEditClick = (row) => {
        // Handle the edit action for the specific row
        console.log(`Edit clicked for row: ${row.name}`);
        // Add your edit logic here
        // For example, you could open a modal for editing
    };


    const data = [
        {id:'1', name: 'Tiger Nixon', position: '	System Architect', office: '	Edinburgh', age: '61', selery: '	$320,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date:'2001/04/25' },
        
        {id:'2',  name: 'Hermione Butler', position: 'Regional Director', office: '	London', age: '64', selery: '	$327,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date:'2001/04/25' },

        {id:'3',  name: 'Hermione Jonshan', position: 'Regional Director', office: '	New York', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date:'2001/04/25' },

        {id:'4',  name: 'Hermione Jonshan', position: 'Regional Director', office: '	New York', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date:'2001/04/25' }

        , {id:'5',  name: 'Hermione Jonshan', position: 'Regional Director', office: '	New York', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125' , Date:'2001/04/25'},

        {id:'6',  name: 'Hermione Jonshan', position: 'Regional Director', office: '	New York', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date:'2001/04/25' },

        {id:'7',  name: 'Hermione Jonshan', position: 'Regional Director', office: '	New York', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125' , Date:'2001/04/25'},

        {id:'8',  name: 'Hermione Jonshan', position: 'Regional Director', office: '	New York', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125' , Date:'2001/04/25'},

        {id:'9',  name: 'Hermione Jonshan', position: 'Regional Director', office: '	New York', age: '64', selery: '	$234,800', gender: 'male', code: '456256', invitecode: '454212', status: '454242', time: '21:37', wallet: '$2125', Date:'2005/11/14' }
    ]

    const filteredData = data.filter((row) =>
     row.Date.toLowerCase().includes(searchTerm.toLowerCase())
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

                {/*  */}
                {/* <div></div> */}
                <div className='search-and-button d-flex mt-4' style={{ justifyContent: 'space-between' }}>
                    <div className='buttons'>
                        <button onClick={copyTable}>Copy</button>
                        <button onClick={downloadTableAsCSV}>CSV</button>
                        <button onClick={downloadTableAsCSV}>Excel</button>
                        <button>PDF</button>
                        <button onClick={handlePrint}>Print</button>

                    </div>
                    <div>
                        Search:-
                        <input type="text" placeholder='enter Date' value={searchTerm} style={{border:'1px solid #C7C8C9'}}
                            onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>
                {/*  */}


                <hr />
                <div className="table-responsive">


                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">
                                <h4 className="mb-0">Approved DataTable</h4>
                            </div>
                            <hr />
                            <div className="table-responsive">
                                <table ref={tableRef} id="myTable" className="table table-striped table-bordered" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>S.NO</th>
                                            <th>From</th>
                                            <th>Wallet Address</th>
                                            <th>Amount</th>
                                            <th>Transcation Hash</th>
                                            <th>Remark</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                           

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((row, index) => (
                                            <tr key={index}
                                            //  style={{textAlign:'center'}}
                                            >
                                                <td>{row.id}</td>
                                                <td>{row.office}</td>
                                                <td>{row.position}</td>
                                                <td>{row.selery}</td>
                                                <td>{row.age}</td>
                                                <td>{row.gender}</td>
                                                <td>{row.Date}</td>
                                                <td>{row.time}</td>
                                                {/* <td>
                                                    <abbr title='Edit' onClick={() => handleEditClick(row)}>
                                                        <EditNoteIcon style={{ color: 'blue', cursor: 'pointer' }} />
                                                    </abbr>
                                                    <abbr title='Delete'>
                                                        <DeleteForeverIcon style={{ color: 'red', cursor: 'pointer' }} />
                                                    </abbr>
                                                    <abbr onClick={() => navigate('/SingleUser')} title='User'>
                                                        <PersonIcon style={{ color: 'hotpink', cursor: 'pointer' }} />
                                                    </abbr>
                                                    <abbr title='Group'>
                                                        <GroupIcon style={{ color: 'hotpink', cursor: 'pointer' }} />
                                                    </abbr>
                                                </td> */}
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

export default Approved
