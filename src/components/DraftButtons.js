import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import { Delete, Reply, Edit } from "@material-ui/icons";
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
});

const DraftButtons = ({
  deleteClickedHandler,
  mailId,
  setEditing,
  sendClickedHandler,
}) => {
  const classes = useStyles();
  const sendLoading = useSelector((state) => state.mails.sendLoading);

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
        onClick={setEditing}
      >
        Edit
      </Button>
      {sendLoading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonGroupButton}
          endIcon={<Reply />}
          onClick={sendClickedHandler}
        >
          Send
        </Button>
      )}
    </div>
  );
};

export default DraftButtons;
