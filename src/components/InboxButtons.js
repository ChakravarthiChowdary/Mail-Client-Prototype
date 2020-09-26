import { Button, makeStyles } from "@material-ui/core";
import { Delete, Forward, Reply, ReplyAll } from "@material-ui/icons";
import React from "react";

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

const InputButtons = ({ deleteClickedHandler, mailId, setEditing }) => {
  const classes = useStyles();

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
        onClick={setEditing}
      >
        Forward
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.buttonGroupButton}
        endIcon={<Reply />}
        onClick={setEditing}
      >
        Reply
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.buttonGroupButton}
        endIcon={<ReplyAll />}
        onClick={setEditing}
      >
        Reply all
      </Button>
    </div>
  );
};

export default InputButtons;
