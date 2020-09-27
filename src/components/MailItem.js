import { Divider, makeStyles, Paper, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import React from "react";

import { deleteMail } from "../store/actions/mailsActions";

const useStyles = makeStyles({
  mailItemDivider: {
    marginTop: 6,
    marginBottom: 6,
  },
  mailItemDateDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  mailItemSubjectDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const MailItem = ({ mail, mailClick, style }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const deleteClickedHandler = () => {
    dispatch(deleteMail(mail.id, location.pathname));
  };
  return (
    <Paper
      elevation={3}
      className="mailItemPaper"
      onClick={() => mailClick(mail)}
    >
      <Typography>From: {mail.from}</Typography>
      <Divider className={classes.mailItemDivider} />
      <div className={classes.mailItemSubjectDiv}>
        <Typography>Subject: {mail.subject}</Typography>
        <Delete
          color="secondary"
          className="mailItemDeleteIcon"
          onClick={deleteClickedHandler}
        />
      </div>
      <Divider className={classes.mailItemDivider} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          ...style,
        }}
      >
        {location.pathname === "/AllMails" && (
          <Typography style={{ fontWeight: "bold" }}>
            Folder: {mail.fromFolder.toUpperCase()}
          </Typography>
        )}
        <Typography>{mail.fromDate}</Typography>
      </div>
    </Paper>
  );
};

export default MailItem;
