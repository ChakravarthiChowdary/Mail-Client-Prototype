import React, { Fragment, useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import MailItem from "./MailItem";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  mailsPaginateDiv: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  mailsMailItemDiv: {
    minHeight: 650,
    maxHeight: 650,
    overflowY: "scroll",
    overflowX: "hidden",
  },
});

const Mails = ({ mails, mailClick }) => {
  const classes = useStyles();
  const location = useLocation();
  const deleteError = useSelector((state) => state.mails.deleteError);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [location.pathname]);

  useEffect(() => {
    if (deleteError) setOpen(true);
    else setOpen(false);
  }, [deleteError]);

  const mailsPerPage = 5;
  const indexOfLastMail = currentPage * mailsPerPage;
  const indexOfFirstMail = indexOfLastMail - mailsPerPage;
  const currentMails = mails.slice(indexOfFirstMail, indexOfLastMail);

  return (
    <Fragment>
      <div className={classes.mailsMailItemDiv}>
        {currentMails.map((mail) => (
          <MailItem key={mail.id} mail={mail} mailClick={mailClick} />
        ))}
      </div>
      <div className={classes.mailsPaginateDiv}>
        <Pagination
          count={Math.ceil(mails.length / mailsPerPage)}
          page={currentPage}
          color="primary"
          onChange={handleChange}
        />
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {deleteError ? `${deleteError.message}\nCannot delete !` : ""}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default Mails;
