import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import {
  Delete,
  Forward,
  Reply,
  ReplyAll,
  Edit,
  RestoreFromTrash,
  Save,
} from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

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
});

const ButtonGroup = ({
  deleteClickedHandler,
  mailId,
  enableSend,
  discardClickedHandler,
  sendClickedHandler,
}) => {
  const classes = useStyles();
  const location = useLocation();
  const sendLoading = useSelector((state) => state.mails.sendLoading);

  if (location.pathname === "/Inbox" || location.pathname === "/Starred") {
    return (
      <div className={classes.buttonGroupDiv}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.buttonGroupButton}
          endIcon={<Delete />}
          onClick={() => deleteClickedHandler(mailId)}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonGroupButton}
          endIcon={<Forward />}
        >
          Forward
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonGroupButton}
          endIcon={<Reply />}
        >
          Reply
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonGroupButton}
          endIcon={<ReplyAll />}
        >
          Reply all
        </Button>
      </div>
    );
  } else if (location.pathname === "/Trash") {
    return (
      <div className={classes.buttonGroupDiv}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.buttonGroupButton}
          endIcon={<Delete />}
          onClick={() => deleteClickedHandler(mailId)}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonGroupButton}
          endIcon={<RestoreFromTrash />}
        >
          Restore
        </Button>
      </div>
    );
  } else if (location.pathname === "/Drafts") {
    return (
      <div className={classes.buttonGroupDiv}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.buttonGroupButton}
          endIcon={<Delete />}
          onClick={() => deleteClickedHandler(mailId)}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonGroupButton}
          endIcon={<Edit />}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonGroupButton}
          endIcon={<Reply />}
        >
          Send
        </Button>
      </div>
    );
  } else if (location.pathname === "/Spam") {
    return (
      <div className={classes.buttonGroupDiv}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.buttonGroupButton}
          endIcon={<Delete />}
          onClick={() => deleteClickedHandler(mailId)}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonGroupButton}
          endIcon={<Forward />}
        >
          Forward
        </Button>
      </div>
    );
  }
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
      <Button
        variant="contained"
        color="primary"
        className={classes.buttonGroupButton}
        endIcon={<Save />}
      >
        Save as draft
      </Button>
      {sendLoading ? (
        <CircularProgress />
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
  );
};

export default ButtonGroup;
