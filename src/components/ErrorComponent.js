import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Button, Typography, Backdrop } from "@material-ui/core";
import { Cached } from "@material-ui/icons";

import NavBar from "./NavBar";

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

const ErrorComponent = ({ loadMails }) => {
  const classes = useStyles();
  const { error } = useSelector((state) => state.mails);

  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.mainCircularProgress}>
          <Backdrop className={classes.backdrop} open={true}>
            <div className={classes.mainErrorDiv}>
              <Typography variant="h5" className={classes.mainErrorMessage}>
                {error.message}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Cached />}
                onClick={loadMails}
              >
                Try Again
              </Button>
            </div>
          </Backdrop>
        </div>
      </main>
    </div>
  );
};

export default ErrorComponent;
