import React, { Fragment, useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import MailItem from "./MailItem";
import SearchBar from "./SearchBar";

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
    minHeight: 590,
    maxHeight: 590,
    overflowY: "scroll",
    overflowX: "hidden",
  },
});

const Mails = ({ mails, mailClick }) => {
  const classes = useStyles();
  const location = useLocation();
  //Redux level state
  const settings = useSelector((state) => state.mails.settings);
  //component level state
  const [currentPage, setCurrentPage] = useState(1);
  const [mailsPerPage, setMailsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    setCurrentPage(1);
    setSearchText("");
  }, [location.pathname]);

  useEffect(() => {
    if (settings && settings.mailsPerPage !== 5) {
      setMailsPerPage(settings.mailsPerPage);
    }
  }, [settings]);

  const searchChangedHandler = (event) => {
    setSearchText(event.target.value);
  };

  const filteredMails = mails.filter((mail) => {
    return (
      mail.from.toLowerCase().includes(searchText.toLowerCase()) ||
      mail.subject.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const indexOfLastMail = currentPage * mailsPerPage;
  const indexOfFirstMail = indexOfLastMail - mailsPerPage;
  const currentMails = filteredMails.slice(indexOfFirstMail, indexOfLastMail);

  return (
    <Fragment>
      <SearchBar
        searchText={searchText}
        searchChangedHandler={searchChangedHandler}
      />
      <div className={classes.mailsMailItemDiv}>
        {currentMails.map((mail) => (
          <MailItem
            key={mail.id}
            mail={mail}
            mailClick={mailClick}
            style={
              location.pathname === "/AllMails"
                ? { justifyContent: "space-between" }
                : null
            }
          />
        ))}
      </div>
      <div className={classes.mailsPaginateDiv}>
        <Pagination
          count={Math.ceil(filteredMails.length / mailsPerPage)}
          page={currentPage}
          color="primary"
          onChange={handleChange}
        />
      </div>
    </Fragment>
  );
};

export default Mails;
