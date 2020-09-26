import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import { Delete, RestoreFromTrash } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreDraft } from "../store/actions/mailsActions";

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

const TrashButtons = ({ deleteClickedHandler, mailId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  //Redux level state.
  const trashMail = useSelector((state) =>
    state.mails.trash.find((mail) => mail.id === mailId)
  );
  const restoreLoading = useSelector((state) => state.mails.restoreLoading);

  //Event Handlers.
  const restoreClickedHandler = () => {
    dispatch(restoreDraft(trashMail));
  };

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
      {restoreLoading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonGroupButton}
          endIcon={<RestoreFromTrash />}
          onClick={restoreClickedHandler}
        >
          Restore
        </Button>
      )}
    </div>
  );
};

export default TrashButtons;
