import axios from "axios";

import Mail from "../../models/MailModel";

export const GET_MAILS_START = "GET_MAILS_START";
export const GET_MAILS_SUCCESS = "GET_MAILS_SUCCESS";
export const GET_MAILS_FAIL = "GET_MAILS_FAIL";

export const DELETE_MAIL_START = "DELETE_MAIL_START";
export const DELETE_MAIL_SUCCESS = "DELETE_MAIL_SUCCESS";
export const DELETE_MAIL_FAIL = "DELETE_MAIL_FAIL";

export const SEND_MAIL_START = "SEND_MAIL_START";
export const SEND_MAIL_SUCCESS = "SEND_MAIL_SUCCESS";
export const SEND_MAIL_FAIL = "SEND_MAIL_FAIL";

export const SAVE_DRAFT_START = "SAVE_DRAFT_START";
export const SAVE_DRAFT_SUCCESS = "SAVE_DRAFT_SUCCESS";
export const SAVE_DRAFT_FAIL = "SAVE_DRAFT_FAIL";

export const RESTORE_DELETED_START = "RESTORE_DELETED_START";
export const RESTORE_DELETED_SUCCESS = "RESTORE_DELETED_SUCCESS";
export const RESTORE_DELETED_FAIL = "RESTORE_DELETED_FAIL";

export const SAVE_SETTINGS_START = "SAVE_SETTINGS_START";
export const SAVE_SETTINGS_SUCCESS = "SAVE_SETTINGS_SUCCESS";
export const SAVE_SETTINGS_FAIL = "SAVE_SETTINGS_FAIL";

export const getMails = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_MAILS_START });
      //Get all mails from the API.
      const response = await axios.get(
        "https://mail-client-afecb.firebaseio.com/mails/j743JnyWeSeR5vHIdNxbrrf3FAJ2.json"
      );
      const settingsResponce = await axios.get(
        "https://mail-client-afecb.firebaseio.com/mails/j743JnyWeSeR5vHIdNxbrrf3FAJ2/settings.json"
      );
      let tempMails = [];

      for (let key in response.data) {
        for (let mail in response.data[key]) {
          tempMails.push(
            new Mail(
              response.data[key][mail].body,
              response.data[key][mail].from,
              response.data[key][mail].fromDate,
              response.data[key][mail].fromFolder,
              response.data[key][mail].id,
              response.data[key][mail].subject,
              response.data[key][mail].to,
              response.data[key][mail].cc,
              response.data[key][mail].bcc,
              response.data[key][mail].isTrash,
              key
            )
          );
        }
      }
      //filter all mails based on the assigned key.
      const mails = {
        inboxMails: tempMails.filter((mail) => mail.key === "inbox"),
        sentMails: tempMails.filter((mail) => mail.key === "sent"),
        trashMails: tempMails.filter((mail) => mail.key === "trash"),
        draftMails: tempMails.filter((mail) => mail.key === "drafts"),
        spamMails: tempMails.filter((mail) => mail.key === "spam"),
        allMails: tempMails.filter((mail) => mail.key !== "settings"),
        settings: settingsResponce.data,
      };
      dispatch({ type: GET_MAILS_SUCCESS, payload: mails });
    } catch (error) {
      dispatch({ type: GET_MAILS_FAIL, payload: error });
    }
  };
};

export const deleteMail = (mailId, path) => {
  return async (dispatch, getState) => {
    try {
      const deletedMail = getState().mails.allmails.find(
        (mail) => mail.id === mailId
      );
      delete deletedMail["key"]; //Deleting the property key added in the UI.
      dispatch({ type: DELETE_MAIL_START });
      if (path !== "/Trash") {
        //Delete from the existing folder.
        await axios.delete(
          `https://mail-client-afecb.firebaseio.com/mails/j743JnyWeSeR5vHIdNxbrrf3FAJ2/${deletedMail.fromFolder}/${deletedMail.id}.json`
        );
        //Patch to the trash folder.
        await axios.patch(
          `https://mail-client-afecb.firebaseio.com/mails/j743JnyWeSeR5vHIdNxbrrf3FAJ2/trash/${deletedMail.id}.json`,
          deletedMail
        );
      } else {
        //If Mail is from trash folder remove the mail just from trash folder.
        await axios.delete(
          `https://mail-client-afecb.firebaseio.com/mails/j743JnyWeSeR5vHIdNxbrrf3FAJ2/trash/${deletedMail.id}.json`
        );
      }
      const payload = {
        deletedMail: deletedMail,
        path: path,
      };
      dispatch({ type: DELETE_MAIL_SUCCESS, payload: payload });
    } catch (error) {
      dispatch({ type: DELETE_MAIL_FAIL, payload: error });
    }
  };
};

export const sendMail = (mail) => {
  return async (dispatch, getState) => {
    try {
      //Create new id dynamically
      const sendMailsLength = getState().mails.sent.length;
      mail.id = `s${sendMailsLength + 1}`;
      //Setting current date for the mail
      const date = new Date();
      mail.fromDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;

      dispatch({ type: SEND_MAIL_START });
      //Patch the new mail to the sent mail folder.
      await axios.patch(
        `https://mail-client-afecb.firebaseio.com/mails/j743JnyWeSeR5vHIdNxbrrf3FAJ2/sent/${mail.id}.json`,
        mail
      );
      dispatch({ type: SEND_MAIL_SUCCESS, payload: mail });
    } catch (error) {
      dispatch({ type: SEND_MAIL_FAIL, payload: error });
    }
  };
};

export const saveDraft = (mail) => {
  return async (dispatch, getState) => {
    try {
      //Generating Id dynamically.
      const draftsMailsLength = getState().mails.drafts.length;
      mail.id = `d${draftsMailsLength + 1}`;

      //Setting current date for the mail
      const date = new Date();
      mail.fromDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;

      dispatch({ type: SAVE_DRAFT_START });
      //Patch the new mail to the sent mail folder.
      await axios.patch(
        `https://mail-client-afecb.firebaseio.com/mails/j743JnyWeSeR5vHIdNxbrrf3FAJ2/drafts/${mail.id}.json`,
        mail
      );
      dispatch({ type: SAVE_DRAFT_SUCCESS, payload: mail });
    } catch (error) {
      dispatch({ type: SAVE_DRAFT_FAIL, payload: error });
    }
  };
};

export const restoreDraft = (mail) => {
  return async (dispatch) => {
    try {
      dispatch({ type: RESTORE_DELETED_START });
      //Patching same mail to the folder.
      await axios.patch(
        `https://mail-client-afecb.firebaseio.com/mails/j743JnyWeSeR5vHIdNxbrrf3FAJ2/${mail.fromFolder}/${mail.id}.json`,
        mail
      );
      //Deleteing mail from the trash.
      await axios.delete(
        `https://mail-client-afecb.firebaseio.com/mails/j743JnyWeSeR5vHIdNxbrrf3FAJ2/trash/${mail.id}.json`
      );
      dispatch({ type: RESTORE_DELETED_SUCCESS, payload: mail });
    } catch (error) {
      dispatch({ type: RESTORE_DELETED_FAIL, payload: error });
    }
  };
};

export const saveSettings = (settings) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SAVE_SETTINGS_START });
      await axios.patch(
        `https://mail-client-afecb.firebaseio.com/mails/j743JnyWeSeR5vHIdNxbrrf3FAJ2/settings.json`,
        settings
      );
      dispatch({ type: SAVE_SETTINGS_SUCCESS, payload: settings });
    } catch (error) {
      dispatch({ type: SAVE_SETTINGS_FAIL, payload: error });
    }
  };
};
