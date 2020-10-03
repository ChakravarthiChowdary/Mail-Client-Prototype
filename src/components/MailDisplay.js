import { makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

import ButtonGroup from "./ButtonGroup";
import SnackBar from "./SnackBar";

const useStyles = makeStyles({
  mailDisplayPaper: {
    height: 700,
  },
  mailDisplayDiv: {
    padding: 50,
    width: "100%",
  },
  mailDisplayTextField: {
    marginBottom: 10,
  },
  mailDisplayInputDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  mailDisplayBodyDiv: {
    minHeight: 300,
    minWidth: 200,
  },
});

const MailDisplay = ({ mail }) => {
  const classes = useStyles();
  const location = useLocation();

  //Component level state
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [cc, setCC] = useState("");
  const [bcc, setBCC] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [editingAllowed, setEditingAllowed] = useState(false);
  const [draftopen, setDraftOpen] = useState(false);
  const [sendopen, setSendOpen] = useState(false);
  const [deleteopen, setDeleteOpen] = useState(false);
  //Redux level state
  const draftsError = useSelector((state) => state.mails.draftError);
  const sendError = useSelector((state) => state.mails.sendError);
  const deleteError = useSelector((state) => state.mails.deleteError);
  const unChangedmail = useSelector((state) => state.mails.allmails);

  //To convert all mail data to JSON Object.
  const convertToObject = (fromFolder) => {
    return {
      from: from,
      to: to,
      cc: cc,
      bcc: bcc,
      body: body,
      subject: subject,
      fromFolder: fromFolder,
    };
  };

  //Toggle editing state.
  const editingAllowedHandler = () => {
    setEditingAllowed((prevState) => !prevState);
  };

  //to set mail field values if mail is available.
  useEffect(() => {
    if (mail) {
      setFrom(mail.from);
      setTo(mail.to);
      setCC(mail.cc);
      setBCC(mail.bcc);
      setSubject(mail.subject);
      setBody(mail.body);
    }
  }, [mail]);

  //To set to previous mail fields after editing or sending or drafting the mail.
  useEffect(() => {
    if (mail) {
      const unChanged = unChangedmail.find((allmail) => allmail.id === mail.id);
      setFrom(unChanged.from);
      setTo(unChanged.to);
      setCC(unChanged.cc);
      setBCC(unChanged.bcc);
      setSubject(unChanged.subject);
      setBody(unChanged.body);
    }
  }, [editingAllowed]);

  useEffect(() => {
    if (editingAllowed) {
      setEditingAllowed(false);
    }
  }, [location.pathname, mail]);

  //To display snack bar when error occured.
  useEffect(() => {
    if (draftsError) setDraftOpen(true);
    else setDraftOpen(false);
    if (sendError) setSendOpen(true);
    else setSendOpen(false);
    if (deleteError) setDeleteOpen(true);
    else setDeleteOpen(false);
  }, [draftsError, sendError, deleteError]);

  return (
    <Paper className={classes.mailDisplayPaper}>
      <div className={classes.mailDisplayDiv}>
        <div className={classes.mailDisplayInputDiv}>
          <Typography variant="h6" style={{ minWidth: 100, marginBottom: 20 }}>
            From
          </Typography>
          <TextField
            id="emailFrom"
            value={from}
            InputProps={{
              readOnly: mail ? true : false,
            }}
            onChange={(event) => setFrom(event.target.value)}
            fullWidth
            size="small"
            className={classes.mailDisplayTextField}
            variant="outlined"
            focused
          />
        </div>
        <div className={classes.mailDisplayInputDiv}>
          <Typography variant="h6" style={{ minWidth: 100, marginBottom: 20 }}>
            To
          </Typography>
          <TextField
            id="emailTo"
            value={to}
            InputProps={{
              readOnly: mail && !editingAllowed ? true : false,
            }}
            fullWidth
            size="small"
            className={classes.mailDisplayTextField}
            onChange={(event) => setTo(event.target.value)}
            variant="outlined"
            focused
          />
        </div>
        <div className={classes.mailDisplayInputDiv}>
          <Typography variant="h6" style={{ minWidth: 100, marginBottom: 20 }}>
            CC
          </Typography>
          <TextField
            id="emailCC"
            value={cc}
            InputProps={{
              readOnly: mail && !editingAllowed ? true : false,
            }}
            fullWidth
            size="small"
            onChange={(event) => setCC(event.target.value)}
            className={classes.mailDisplayTextField}
            variant="outlined"
            focused
          />
        </div>
        <div className={classes.mailDisplayInputDiv}>
          <Typography variant="h6" style={{ minWidth: 100, marginBottom: 20 }}>
            BCC
          </Typography>
          <TextField
            id="emailBCC"
            value={bcc}
            InputProps={{
              readOnly: mail && !editingAllowed ? true : false,
            }}
            fullWidth
            size="small"
            className={classes.mailDisplayTextField}
            onChange={(event) => setBCC(event.target.value)}
            variant="outlined"
            focused
          />
        </div>
        <div className={classes.mailDisplayInputDiv}>
          <Typography variant="h6" style={{ minWidth: 100, marginBottom: 20 }}>
            Subject
          </Typography>
          <TextField
            id="emailSubject"
            value={subject}
            InputProps={{
              readOnly: mail && !editingAllowed ? true : false,
            }}
            fullWidth
            size="small"
            className={classes.mailDisplayTextField}
            onChange={(event) => setSubject(event.target.value)}
            variant="outlined"
            focused
          />
        </div>
        <div className={classes.mailDisplayBodyDiv}>
          <TextField
            id="emailBody"
            value={body}
            InputProps={{
              readOnly: mail && !editingAllowed ? true : false,
            }}
            fullWidth
            size="small"
            className={classes.mailDisplayTextField}
            onChange={(event) => setBody(event.target.value)}
            variant="outlined"
            multiline
            rows={12}
            focused
          />
        </div>
        <div>
          <ButtonGroup
            enableSend={
              from !== "" && to !== "" && body !== "" && subject !== ""
            }
            fromFolder={mail ? mail.fromFolder : null}
            isTrash={mail ? mail.isTrash : null}
            setEditing={editingAllowedHandler}
            convertToObject={convertToObject}
            mailId={mail ? mail.id : null}
            editingAllowed={editingAllowed}
          />
        </div>
      </div>
      {/* Snack bars to display error message. */}
      <SnackBar
        open={draftopen}
        error={draftsError}
        message="Cannot save drafts"
        closeHandler={() => setDraftOpen(false)}
      />
      <SnackBar
        open={sendopen}
        error={sendError}
        message="Cannot send mail"
        closeHandler={() => setSendOpen(false)}
      />
      <SnackBar
        open={deleteopen}
        error={deleteError}
        message="Cannot delete mail"
        closeHandler={() => setDeleteOpen(false)}
      />
    </Paper>
  );
};

export default MailDisplay;
