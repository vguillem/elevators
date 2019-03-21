import React from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

import ElevatorPosition from '../../components/ElevatorPosition/ElevatorPosition'
import ElevatorButton from '../../components/ElevatorButton/ElevatorButton'
import styles from "./styles";

class Tableau extends React.Component {

  render() {
    const { classes, elevatorIndex, etages, action, actif } = this.props;
    return (
      <div
        className={classes.pannel}
      >
        {etages.map((etage, buttonIndex) => {
          return (
            <Grid
              container
            >
              <Grid xs={4}>
                etage {etage.name}
              </Grid>
              <Grid xs={4}>
                <ElevatorPosition
                  actif={actif}
                  name={etage.name}
                />
              </Grid>
              <Grid xs={4}>
                <ElevatorButton
                  name={etage.name}
                  actif={etage.requis}
                  elevatorIndex={elevatorIndex}
                  buttonIndex={buttonIndex}
                  action={action}
                />
              </Grid>
            </Grid>
          )})}
      </div>
    )
  }
}

Tableau.propTypes = {
  classes: PropTypes.object.isRequired,
  elevatorIndex: PropTypes.number.isRequired,
  etages: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  actif: PropTypes.number.isRequired,
};

export default withStyles(styles)(Tableau);