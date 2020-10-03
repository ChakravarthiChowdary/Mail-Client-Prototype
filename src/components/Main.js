import React, { useEffect, useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Backdrop } from "@material-ui/core";
import { Route, Switch } from "react-router";

import NavBar from "./NavBar";
import { getMails } from "../store/actions/mailsActions";
import Settings from "./Settings";
import MailComponent from "./MailComponent";
import Compose from "./Compose";
import ErrorComponent from "./ErrorComponent";
import Logout from "./Logout";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    paddingTop: theme.spacing(3),

    marginTop: 60,
  },
  control: {
    padding: theme.spacing(2),
  },
  mainCircularProgress: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  mainErrorDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 500,
    padding: 20,
  },
  mainErrorMessage: {
    marginBottom: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Main = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { loading, error } = useSelector((state) => state.mails);

  const handleClose = () => {
    setOpen(false);
  };

  const loadMails = useCallback(() => {
    dispatch(getMails());
  }, [dispatch]);

  useEffect(() => {
    loadMails();
  }, [loadMails]);

  useEffect(() => {
    setOpen(loading);
  }, [loading]);

  if (error) {
    return <ErrorComponent loadMails={loadMails} />;
  }

  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content}>
        {loading ? (
          <div className={classes.mainCircularProgress}>
            <Backdrop
              className={classes.backdrop}
              open={open}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        ) : (
          <Grid container className={classes.root} spacing={5}>
            <Switch>
              <Route path="/settings" component={Settings} />
              <Route path="/Compose" component={Compose} />
              <Route path="/Logout" component={Logout} />
              <Route path="/" component={MailComponent} />
            </Switch>
          </Grid>
        )}
      </main>
    </div>
  );
};

export default Main;
