import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Toast(props) {
  return (
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={props.show} autoHideDuration={4000} onClose={props.clearToast}>
      <Alert severity={props.color === "green" ? "success" : "error"} onClose={props.clearToast}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}
