import React from "react";
import Grid from "@material-ui/core/Grid";

import MailDisplay from "./MailDisplay";

const Compose = () => {
  return (
    <Grid item xs={12}>
      <MailDisplay />
    </Grid>
  );
};

export default Compose;
