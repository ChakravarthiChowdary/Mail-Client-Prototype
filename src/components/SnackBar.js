import React, { Fragment } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar = ({ error, open, closeHandler, message }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeHandler();
  };
  return (
    <Fragment>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error ? `${error.message} ${message}` : ""}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default SnackBar;
