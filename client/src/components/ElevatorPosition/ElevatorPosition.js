import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

import styles from './styles';

function ElevatorPosition(props) {
  const { classes, actif, name } = props;
  return (
      <Fab
        color={ actif === name ? "secondary" : "primary" }
      >
        actif
      </Fab>
  );
}

ElevatorPosition.propTypes = {
  classes: PropTypes.object.isRequired,
  actif: PropTypes.number.isRequired,
  name: PropTypes.number.isRequired,
};

export default withStyles(styles)(ElevatorPosition);