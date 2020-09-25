import React from "react";
import Grid from "@material-ui/core/Grid";

import Mails from "./Mails";

const GridItem = ({ data, mailClick }) => {
  return (
    <Grid item xs={4}>
      <Mails mails={data} mailClick={mailClick} />
    </Grid>
  );
};

export default GridItem;
