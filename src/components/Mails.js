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

  //To set the current page.
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  //To set current page to 1 and to reset search text whenever path changes.
  useEffect(() => {
    setCurrentPage(1);
    setSearchText("");
  }, [location.pathname]);

  //To set mails per page whenever setting is changed.
  useEffect(() => {
    if (settings && settings.mailsPerPage !== 5) {
      setMailsPerPage(settings.mailsPerPage);
    }
  }, [settings]);

  //To set the search text when changed.
  const searchChangedHandler = (event) => {
    setSearchText(event.target.value);
  };

  //Filter mails based on search text.
  const filteredMails = mails.filter((mail) => {
    return (
      mail.from.toLowerCase().includes(searchText.toLowerCase()) ||
      mail.subject.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const indexOfLastMail = currentPage * mailsPerPage;
  const indexOfFirstMail = indexOfLastMail - mailsPerPage;
  //Current mails are received from the filtered mails. These are displayed by pagination.
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
