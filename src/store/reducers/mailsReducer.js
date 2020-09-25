import {
  GET_MAILS_START,
  GET_MAILS_SUCCESS,
  GET_MAILS_FAIL,
  DELETE_MAIL_SUCCESS,
  DELETE_MAIL_FAIL,
  SEND_MAIL_SUCCESS,
  SEND_MAIL_FAIL,
  SEND_MAIL_START,
} from "../actions/mailsActions";
import stateUpdate from "../../utils/stateUpdate";

const initialState = {
  loading: false,
  error: null,
  inbox: [],
  sent: [],
  trash: [],
  drafts: [],
  spam: [],
  allmails: [],
  deleteError: null,
  sendError: null,
  sendLoading: false,
};

const mailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAILS_START:
      return stateUpdate(state, { loading: true });
    case GET_MAILS_SUCCESS:
      return stateUpdate(state, {
        loading: false,
        inbox: action.payload.inboxMails,
        sent: action.payload.sentMails,
        trash: action.payload.trashMails,
        drafts: action.payload.draftMails,
        spam: action.payload.spamMails,
        allmails: action.payload.allMails,
        error: null,
      });
    case GET_MAILS_FAIL:
      return stateUpdate(state, { loading: false, error: action.payload });
    case DELETE_MAIL_SUCCESS:
      const updateState = {
        loading: false,
        deleteError: null,
      };
      if (action.payload.path !== "/Trash") {
        updateState[action.payload.deletedMail.fromFolder] = state[
          action.payload.deletedMail.fromFolder
        ].filter((mail) => mail.id !== action.payload.deletedMail.id);
        updateState.trash = state.trash.concat(action.payload.deletedMail);
      } else {
        updateState.trash = state.trash.filter(
          (mail) => mail.id !== action.payload.deletedMail.id
        );
      }
      return stateUpdate(state, updateState);
    case DELETE_MAIL_FAIL:
      return stateUpdate(state, {
        loading: false,
        deleteError: action.payload,
      });
    case SEND_MAIL_START:
      return stateUpdate(state, { sendLoading: true });
    case SEND_MAIL_SUCCESS:
      return stateUpdate(state, {
        sendError: null,
        sendLoading: false,
        sent: state.sent.concat(action.payload),
      });
    case SEND_MAIL_FAIL:
      return stateUpdate(state, {
        sendError: action.payload,
        sendLoading: false,
      });
    default:
      return state;
  }
};

export default mailsReducer;
