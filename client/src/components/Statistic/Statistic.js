import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getStatistic } from "../../redux/statisticReducer.js";
import StatisticGrid from "./StatisticGrig.js";
import Alert from '@mui/material/Alert';
import { connect } from 'react-redux';
import Stack from '@mui/material/Stack';
import {Navigation} from "../Navigation.js";

function Statistic(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatistic());
  }, [dispatch]);


  const alertType = props.statistic.status ? 'success' : 'error'
  let alert = typeof props.statistic.status == 'object' ? '' :
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={alertType}>
        {props.statistic.message}
      </Alert>
    </Stack>;


  return (
    <div className="">
      <Navigation/>
      
      {alert}
      <StatisticGrid></StatisticGrid>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    statistic: state.statistic
  }
}
export default connect(mapStatetoProps)(Statistic);

