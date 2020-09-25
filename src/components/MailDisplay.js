import { makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ButtonGroup from "./ButtonGroup";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { deleteMail, sendMail } from "../store/actions/mailsActions";

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
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  //Component level state
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [cc, setCC] = useState("");
  const [bcc, setBCC] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  //Event handlers
  const deleteClickedHandler = () => {
    dispatch(deleteMail(mail.id, location.pathname));
  };
  const sendClickedHandler = async () => {
    await dispatch(
      sendMail({
        from: from,
        to: to,
        cc: cc,
        bcc: bcc,
        body: body,
        subject: subject,
        fromFolder: "sent",
      })
    );
  };
  const discardClickedHandler = () => {
    history.replace("/Inbox");
  };

  //Hooks
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
              readOnly: mail ? true : false,
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
              readOnly: mail ? true : false,
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
              readOnly: mail ? true : false,
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
              readOnly: mail ? true : false,
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
            defaultValue={body}
            InputProps={{
              readOnly: mail ? true : false,
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
            deleteClickedHandler={deleteClickedHandler}
            sendClickedHandler={sendClickedHandler}
            discardClickedHandler={discardClickedHandler}
            enableSend={
              from !== "" && to !== "" && body !== "" && subject !== ""
            }
            mailId={mail ? mail.id : null}
          />
        </div>
      </div>
    </Paper>
  );
};

export default MailDisplay;
