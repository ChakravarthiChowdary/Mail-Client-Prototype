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

export const getMails = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_MAILS_START });
      const response = await axios.get(
        "https://mail-client-afecb.firebaseio.com/mails/j743JnyWeSeR5vHIdNxbrrf3FAJ2.json"
      );

      let inboxMails = [];
      let sentMails = [];
      let draftMails = [];
      let trashMails = [];
      let spamMails = [];
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
              key
            )
          );
        }
      }

      inboxMails = tempMails.filter((mail) => mail.key === "inbox");
      sentMails = tempMails.filter((mail) => mail.key === "sent");
      trashMails = tempMails.filter((mail) => mail.key === "trash");
      draftMails = tempMails.filter((mail) => mail.key === "drafts");
      spamMails = tempMails.filter((mail) => mail.key === "spam");

      const mails = {
        inboxMails: inboxMails,
        sentMails: sentMails,
        trashMails: trashMails,
        draftMails: draftMails,
        spamMails: spamMails,
        allMails: tempMails,
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
      console.log(deletedMail, path);
      dispatch({ type: DELETE_MAIL_START });
      if (path !== "/Trash") {
        await axios.delete(
          `https://mail-client-afecb.firebaseio.com/mails/j743JnyWeSeR5vHIdNxbrrf3FAJ2/${deletedMail.fromFolder}/${deletedMail.id}.json`
        );
        await axios.patch(
          `https://mail-client-afecb.firebaseio.com/mails/j743JnyWeSeR5vHIdNxbrrf3FAJ2/trash/${deletedMail.id}.json`,
          deletedMail
        );
      } else {
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
      const sendMailsLength = getState().mails.sent.length;
      mail.id = `s${sendMailsLength + 1}`;
      //Setting current date for the mail
      const date = new Date();
      mail.fromDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;

      dispatch({ type: SEND_MAIL_START });
      await axios.patch(
        `https://mail-client-afecb.firebaseio.cm/mails/j743JnyWeSeR5vHIdNxbrrf3FAJ2/sent/${mail.id}.json`,
        mail
      );
      dispatch({ type: SEND_MAIL_SUCCESS, payload: mail });
    } catch (error) {
      dispatch({ type: SEND_MAIL_FAIL, payload: error });
    }
  };
};
