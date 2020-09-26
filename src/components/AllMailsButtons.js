import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

import InboxButtons from "./InboxButtons";
import DraftButtons from "./DraftButtons";
import TrashButtons from "./TrashButtons";
import SpamButtons from "./SpamButtons";
import { deleteMail } from "../store/actions/mailsActions";

const AllMailButtons = ({ mailId, fromFolder, isTrash }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const deleteClickedHandler = () => {
    dispatch(deleteMail(mailId, location.pathname));
  };
  if ((fromFolder === "inbox" || fromFolder === "sent") && !isTrash) {
    return (
      <InboxButtons
        mailId={mailId}
        deleteClickedHandler={deleteClickedHandler}
      />
    );
  } else if (fromFolder === "spam" && !isTrash) {
    return (
      <SpamButtons
        mailId={mailId}
        deleteClickedHandler={deleteClickedHandler}
      />
    );
  } else if (fromFolder === "drafts" && !isTrash) {
    return (
      <DraftButtons
        mailId={mailId}
        deleteClickedHandler={deleteClickedHandler}
      />
    );
  }
  return (
    <TrashButtons mailId={mailId} deleteClickedHandler={deleteClickedHandler} />
  );
};

export default AllMailButtons;
