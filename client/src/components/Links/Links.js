import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getUserLinks } from "../../redux/linksReducer.js";
import LinkGrid from "./LinkGrig.js";
import LinkForm from "./LinkForm.js";
import Alert from '@mui/material/Alert';
import { connect } from 'react-redux';
import Stack from '@mui/material/Stack';
import {Navigation} from "../Navigation.js";

function Links(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserLinks());
  }, [dispatch]);



  const alertType = props.links.status ? 'success' : 'error'
  let alert = typeof props.links.status == 'object' ? '' :
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={alertType}>
        {props.links.message}
      </Alert>
    </Stack>;


  return (
    <div className="">
       <Navigation/>
      {alert}
      <LinkForm></LinkForm>
      <LinkGrid></LinkGrid>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    links: state.link
  }
}
export default connect(mapStatetoProps)(Links);

