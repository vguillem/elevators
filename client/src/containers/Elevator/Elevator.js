import React from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

import ElevatorButton from '../../components/ElevatorButton/ElevatorButton'
import ElevatorVoyantsUpDown from '../../components/ElevatorVoyantsUpDown/ElevatorVoyantsUpDown'
import ElevatorVoyantsPorte from '../../components/ElevatorVoyantsPorte/ElevatorVoyantsPorte'
import styles from "./styles";

class Elevator extends React.Component {

  render() {
    const { classes, etages, elevatorIndex, action, etat, porte } = this.props;
    return (
      <div className={classes.pannel}>
        <Grid
          container
          justify="space-around"
          className={classes.voyant}
        >
        {etages.map((etage, buttonIndex) =>
          <span className={classes.button}>
            <ElevatorButton
              name={etage.name}
              actif={etage.requis}
              elevatorIndex={elevatorIndex}
              buttonIndex={buttonIndex}
              action={action}
            />
          </span>
        )}
        </Grid>
        <Grid
          container
          justify="space-around"
          className={classes.voyant}
        >
          <ElevatorVoyantsUpDown
            etat={etat}
          />
          <ElevatorVoyantsPorte
            porte={porte}
          />
        </Grid>
      </div>
    )
  }
}

Elevator.propTypes = {
  classes: PropTypes.object.isRequired,
  elevatorIndex: PropTypes.number.isRequired,
  etages: PropTypes.array.isRequired,
  action: PropTypes.func.isRequired,
  etat: PropTypes.string.isRequired,
  porte: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Elevator);