import React from "react";
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";

import InboxButtons from "./InboxButtons";
import DraftButtons from "./DraftButtons";
import TrashButtons from "./TrashButtons";
import SpamButtons from "./SpamButtons";
import { deleteMail, saveDraft, sendMail } from "../store/actions/mailsActions";
import ComposeButtons from "./ComposeButtons";

const ButtonGroup = ({
  mailId,
  enableSend,
  convertToObject,
  setEditing,
  fromFolder,
  isTrash,
  editingAllowed,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  //Event handlers
  const deleteClickedHandler = () => {
    dispatch(deleteMail(mailId, location.pathname));
  };
  const sendClickedHandler = () => {
    dispatch(sendMail(convertToObject("sent")));
  };
  const discardClickedHandler = () => {
    if (location.pathname === "/Compose") history.replace("/Inbox");
    setEditing();
  };
  const saveDraftClickedHandler = () => {
    dispatch(saveDraft(convertToObject("drafts")));
  };
  if (editingAllowed) {
    return (
      <ComposeButtons
        discardClickedHandler={discardClickedHandler}
        enableSend={enableSend}
        sendClickedHandler={sendClickedHandler}
        saveDraftClickedHandler={saveDraftClickedHandler}
      />
    );
  } else if (
    location.pathname === "/Inbox" ||
    location.pathname === "/Sent" ||
    ((fromFolder === "inbox" || fromFolder === "sent") && !isTrash)
  ) {
    return (
      <InboxButtons
        mailId={mailId}
        deleteClickedHandler={deleteClickedHandler}
        setEditing={setEditing}
      />
    );
  } else if (location.pathname === "/Trash" || isTrash) {
    return (
      <TrashButtons
        mailId={mailId}
        sendClickedHandler={sendClickedHandler}
        deleteClickedHandler={deleteClickedHandler}
      />
    );
  } else if (
    location.pathname === "/Spam" ||
    (fromFolder === "spam" && !isTrash)
  ) {
    return (
      <SpamButtons
        mailId={mailId}
        deleteClickedHandler={deleteClickedHandler}
        setEditing={setEditing}
      />
    );
  } else if (
    location.pathname === "/Drafts" ||
    (fromFolder === "drafts" && !isTrash)
  ) {
    return (
      <DraftButtons
        mailId={mailId}
        deleteClickedHandler={deleteClickedHandler}
        setEditing={setEditing}
        sendClickedHandler={sendClickedHandler}
      />
    );
  }
  return (
    <ComposeButtons
      discardClickedHandler={discardClickedHandler}
      enableSend={enableSend}
      sendClickedHandler={sendClickedHandler}
      saveDraftClickedHandler={saveDraftClickedHandler}
    />
  );
};

export default ButtonGroup;
