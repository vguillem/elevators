import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

import styles from './styles';

function ElevatorButton(props) {
  const { classes, name, actif, action, elevatorIndex, buttonIndex } = props;
  return (
      <Fab
        color={ actif ? "secondary" : "primary" }
        onClick={() => action({elevatorIndex, buttonIndex})}
      >
        {name}
      </Fab>
  );
}

ElevatorButton.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.number.isRequired,
  actif: PropTypes.bool.isRequired,
  elevatorIndex: PropTypes.number.isRequired,
  action: PropTypes.func.isRequired,
  buttonIndex: PropTypes.number.isRequired,
};

export default withStyles(styles)(ElevatorButton);