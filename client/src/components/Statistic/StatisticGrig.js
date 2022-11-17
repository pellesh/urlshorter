import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import { connect } from 'react-redux';

const StatisticGrid = (props) => {

    const columns = [
        { field: '_id', headerName: 'ID', width: 150 },
        {
            field: 'session',
            headerName: 'User',
            width: 350,
            editable: false,
        },
        {
            field: 'count',
            headerName: 'Redirects',
            width: 150,
            editable: false
           
        }
    ]

    return <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
            getRowId={(row) => row._id}
            rows={props.stats}
            columns={columns}
        />
    </Box>;
}


const mapStatetoProps = (state) => {
    return {
        stats: state.statistic.stats
    }
}

export default connect(mapStatetoProps)(StatisticGrid);
