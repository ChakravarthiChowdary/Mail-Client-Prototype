import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import { Delete, Forward, Save } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  buttonGroupDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
  },
  buttonGroupButton: {
    marginRight: 10,
  },
  composeButtonDiv: {
    minWidth: 150,
  },
});

const ComposeButtons = ({
  enableSend,
  discardClickedHandler,
  sendClickedHandler,
  saveDraftClickedHandler,
}) => {
  const classes = useStyles();
  const sendLoading = useSelector((state) => state.mails.sendLoading);
  const draftLoading = useSelector((state) => state.mails.draftLoading);

  return (
    <div className={classes.buttonGroupDiv}>
      <Button
        variant="contained"
        color="secondary"
        className={classes.buttonGroupButton}
        endIcon={<Delete />}
        onClick={discardClickedHandler}
      >
        Discard
      </Button>
      <div className={classes.composeButtonDiv}>
        {draftLoading ? (
          <CircularProgress size={23} />
        ) : (
          <Button
            variant="contained"
            color="primary"
            disabled={!enableSend}
            className={classes.buttonGroupButton}
            endIcon={<Save />}
            onClick={saveDraftClickedHandler}
          >
            Save as draft
          </Button>
        )}
      </div>
      <div className={classes.composeButtonDiv}>
        {sendLoading ? (
          <CircularProgress size={23} />
        ) : (
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonGroupButton}
            endIcon={<Forward />}
            disabled={!enableSend}
            onClick={sendClickedHandler}
          >
            Send
          </Button>
        )}
      </div>
    </div>
  );
};

export default ComposeButtons;
