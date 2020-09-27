import React, { useEffect, useState, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";

import { Route, Switch, useLocation } from "react-router";

import MailDisplay from "./MailDisplay";
import GridItem from "./GridItem";

const MailComponent = () => {
  const location = useLocation();
  const [mailDisplay, setMailDisplay] = useState(null);
  const { inbox, drafts, sent, trash, spam, allmails } = useSelector(
    (state) => state.mails
  );

  useEffect(() => {
    if (location.pathname === "/Inbox" || location.pathname === "/") {
      setMailDisplay(inbox[0]);
    } else if (location.pathname === "/Sent") {
      setMailDisplay(sent[0]);
    } else if (location.pathname === "/Trash") {
      setMailDisplay(trash[0]);
    } else if (location.pathname === "/Drafts") {
      setMailDisplay(drafts[0]);
    } else if (location.pathname === "/AllMails") {
      setMailDisplay(allmails[0]);
    } else if (location.pathname === "/Spam") {
      setMailDisplay(spam[0]);
    }
  }, [location.pathname, inbox, sent, trash, drafts]);

  const mailClickedHandler = (mail) => {
    setMailDisplay(mail);
  };

  return (
    <Fragment>
      <Switch>
        <Route
          path="/allmails"
          render={() => (
            <GridItem data={allmails} mailClick={mailClickedHandler} />
          )}
        />
        <Route
          path="/sent"
          render={() => <GridItem data={sent} mailClick={mailClickedHandler} />}
        />
        <Route
          path="/trash"
          render={() => (
            <GridItem data={trash} mailClick={mailClickedHandler} />
          )}
        />

        <Route
          path="/drafts"
          render={() => (
            <GridItem data={drafts} mailClick={mailClickedHandler} />
          )}
        />
        <Route
          path="/spam"
          render={() => <GridItem data={spam} mailClick={mailClickedHandler} />}
        />
        <Route
          path="/inbox"
          render={() => (
            <GridItem data={inbox} mailClick={mailClickedHandler} />
          )}
        />
        <Route
          path="/"
          exact
          render={() => (
            <GridItem data={inbox} mailClick={mailClickedHandler} />
          )}
        />
      </Switch>
      <Grid item xs={8}>
        <MailDisplay mail={mailDisplay} />
      </Grid>
    </Fragment>
  );
};

export default MailComponent;
