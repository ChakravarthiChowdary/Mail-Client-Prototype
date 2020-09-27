import {
  GET_MAILS_START,
  GET_MAILS_SUCCESS,
  GET_MAILS_FAIL,
  DELETE_MAIL_SUCCESS,
  DELETE_MAIL_FAIL,
  SEND_MAIL_SUCCESS,
  SEND_MAIL_FAIL,
  SEND_MAIL_START,
  SAVE_DRAFT_START,
  SAVE_DRAFT_SUCCESS,
  SAVE_DRAFT_FAIL,
  RESTORE_DELETED_SUCCESS,
  RESTORE_DELETED_FAIL,
  RESTORE_DELETED_START,
  SAVE_SETTINGS_START,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAIL,
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
  draftLoading: false,
  draftError: null,
  restoreLoading: false,
  restoreError: null,
  settings: null,
  settingsLoading: false,
  settingsError: null,
};

const mailsReducer = (state = initialState, action) => {
  switch (action.type) {
    //Get mails action types.
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
        settings: action.payload.settings,
        error: null,
      });
    case GET_MAILS_FAIL:
      return stateUpdate(state, { loading: false, error: action.payload });
    //Delete mail action types.
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
    //Sending mail action types.
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
    //Saving draft action types.
    case SAVE_DRAFT_START:
      return stateUpdate(state, { draftLoading: true });
    case SAVE_DRAFT_SUCCESS:
      return stateUpdate(state, {
        draftLoading: false,
        drafts: state.drafts.concat(action.payload),
        draftError: null,
      });
    case SAVE_DRAFT_FAIL:
      return stateUpdate(state, {
        draftLoading: false,
        draftError: action.payload,
      });
    case RESTORE_DELETED_START:
      return stateUpdate(state, { restoreLoading: true });
    case RESTORE_DELETED_SUCCESS:
      const stateUpdated = {
        restoreLoading: false,
        trash: state.trash.filter((mail) => mail.id !== action.payload.id),
        restoreError: null,
      };
      stateUpdated[action.payload.fromFolder] = state[
        action.payload.fromFolder
      ].concat(action.payload);
      return stateUpdate(state, stateUpdated);
    case RESTORE_DELETED_FAIL:
      return stateUpdate(state, {
        restoreLoading: false,
        restoreError: action.payload,
      });
    case SAVE_SETTINGS_START:
      return stateUpdate(state, { settingsLoading: true });
    case SAVE_SETTINGS_SUCCESS:
      return stateUpdate(state, {
        settings: action.payload,
        settingsLoading: false,
        settingsError: null,
      });
    case SAVE_SETTINGS_FAIL:
      return stateUpdate(state, {
        settingsLoading: false,
        settingsError: action.payload,
      });
    default:
      return state;
  }
};

export default mailsReducer;
