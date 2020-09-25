import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  AllInbox,
  DeleteSweep,
  Drafts,
  Edit,
  Email,
  ExitToApp,
  PresentToAll,
  Settings,
  Warning,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  drawerLink: {
    textDecoration: "none",
  },
  drawerListItem: {
    marginTop: 8,
  },
}));

const DrawerItem = ({ text, index }) => {
  const classes = useStyles();
  const location = useLocation();
  const style = {
    color:
      location.pathname === `/${text}` ||
      (text === "Inbox" && location.pathname === "/")
        ? "#fff"
        : "#000",
  };
  let iconComponent = <MailIcon style={style} />;

  if (text === "AllMails") iconComponent = <AllInbox style={style} />;
  else if (text === "Inbox") iconComponent = <Email style={style} />;
  else if (text === "Drafts") iconComponent = <Drafts style={style} />;
  else if (text === "Sent") iconComponent = <PresentToAll style={style} />;
  else if (text === "Trash") iconComponent = <DeleteSweep style={style} />;
  else if (text === "Settings") iconComponent = <Settings style={style} />;
  else if (text === "Spam") iconComponent = <Warning style={style} />;
  else if (text === "Logout") iconComponent = <ExitToApp style={style} />;
  else if (text === "Compose") iconComponent = <Edit style={style} />;
  return (
    <Fragment>
      <Link className={classes.drawerLink} to={text}>
        <ListItem
          button
          key={text}
          selected={
            location.pathname === `/${text}` ||
            (text === "Inbox" && location.pathname === "/")
          }
          className={classes.drawerListItem}
        >
          <ListItemIcon>{iconComponent}</ListItemIcon>
          <ListItemText
            primary={text}
            style={{
              color:
                location.pathname === `/${text}` ||
                (text === "Inbox" && location.pathname === "/")
                  ? "#fff"
                  : "#000",
            }}
          />
        </ListItem>
      </Link>
    </Fragment>
  );
};

export default DrawerItem;
