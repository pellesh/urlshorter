import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import Link from '@mui/material/Link';
import { connect } from 'react-redux';

const LinkGrid = (props) => {

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'link',
            headerName: 'Original link',
            width: 350,
            editable: false,
        },
        {
            field: 'subpart',
            headerName: 'short link',
            width: 150,
            editable: false,
            renderCell: (params) => {
                return (
                    <Link href={process.env.REACT_APP_SERVER_API + '/' + params.value} target="_blank" >{params.value}</Link>
                )
            },
        }
    ]

    return <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
            getRowId={(row) => row._id}
            rows={props.links}
            columns={columns}
        />
    </Box>;
}


const mapStatetoProps = (state) => {
    return {
        links: state.link.links
    }
}

export default connect(mapStatetoProps)(LinkGrid);
