import {
  Button,
  CircularProgress,
  makeStyles,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import { Save } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { saveSettings } from "../store/actions/mailsActions";
import SnackBar from "./SnackBar";

const useStyles = makeStyles({
  settingsDiv: {
    width: "100%",
    height: "87vh",
    marginTop: 20,
  },
  settingsPaperDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  settingsPaper: {
    width: "50%",
    padding: 20,
  },
  settingsDefaultSignDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  settingsHorizontal: {
    marginTop: 20,
    marginBottom: 20,
  },
  settingsOuterDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  settingsButtonDiv: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    marginTop: 40,
  },
  settingsSaveButton: {
    minWidth: 120,
  },
});

const Settings = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  //Component level state
  const [checked, setChecked] = useState(false);
  const [signature, setSignature] = useState("");
  const [mailsPerPage, setMailsPerPage] = useState(5);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  //Redux level state
  const settings = useSelector((state) => state.mails.settings);
  const settingsloading = useSelector((state) => state.mails.settingsLoading);
  const settingsError = useSelector((state) => state.mails.settingsError);

  useEffect(() => {
    if (settings) {
      setMailsPerPage(settings.mailsPerPage);
      setSignature(settings.defaultSignature);
      setSignature(settings.defaultSignature);
      setChecked(settings.useDefaultSignature);
    }
  }, [settings]);

  useEffect(() => {
    if (settingsError) setOpen(true);
    else setOpen(false);
  }, [settingsError]);

  const inputChangedHandler = (event, field) => {
    setTouched(true);
    setError(null);
    if (field === "mailsperpage") {
      const value = parseInt(event.target.value, 10);
      if (value >= 8) setMailsPerPage(8);
      else if (value <= 5) setMailsPerPage(5);
      else setMailsPerPage(value);
    } else if (field === "switch") {
      setChecked((prevState) => !prevState);
    } else if (field === "signature") {
      setSignature(event.target.value);
    }
  };

  const saveClickedHandler = () => {
    if (touched) {
      if (checked && signature === "") {
        setError("Please fill signature when using default signature");
      } else {
        setTouched(false);
        dispatch(
          saveSettings({
            defaultSignature: signature,
            useDefaultSignature: checked,
            mailsPerPage: mailsPerPage,
          })
        );
      }
    }
  };

  return (
    <div className={classes.settingsDiv}>
      <div className={classes.settingsPaperDiv}>
        <Paper className={classes.settingsPaper} elevation={5}>
          <Typography variant="h5">Settings</Typography>
          <hr className={classes.settingsHorizontal} />
          <div className={classes.settingsOuterDiv}>
            <div>
              <div className={classes.settingsDefaultSignDiv}>
                <Typography>Use Default Signature</Typography>
                <Switch
                  color="primary"
                  checked={checked}
                  onChange={(event) => inputChangedHandler(event, "switch")}
                />
              </div>
              <div>
                <TextField
                  placeholder="Choose your signature"
                  multiline
                  rows={3}
                  rowsMax={5}
                  disabled={!checked}
                  value={signature}
                  onChange={(event) => inputChangedHandler(event, "signature")}
                />
              </div>
            </div>
            <hr width="1" size="100%" />
            <div>
              <div>
                <Typography>Mails Per Page: </Typography>
                <TextField
                  type="number"
                  onChange={(event) =>
                    inputChangedHandler(event, "mailsperpage")
                  }
                  value={mailsPerPage}
                />
              </div>
            </div>
          </div>
          <Typography color="secondary">{error}</Typography>
          <div className={classes.settingsButtonDiv}>
            <div>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{ marginRight: 20 }}
              >
                Discard
              </Button>
            </div>
            <div className={classes.settingsSaveButton}>
              {settingsloading ? (
                <CircularProgress size={23} />
              ) : (
                <Button
                  startIcon={<Save />}
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={saveClickedHandler}
                >
                  Save
                </Button>
              )}
            </div>
          </div>
        </Paper>
      </div>
      <SnackBar
        open={open}
        error={settingsError}
        message="Cannot save settings"
        closeHandler={() => setOpen(false)}
      />
    </div>
  );
};

export default Settings;
