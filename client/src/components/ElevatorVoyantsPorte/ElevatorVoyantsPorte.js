import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

import styles from './styles';

function ElevatorVoyantsPorte(props) {
  const { classes, porte } = props;
  return (
      <Fab color={ porte ? "secondary" : "primary" }>
        Porte
      </Fab>
  );
}

ElevatorVoyantsPorte.propTypes = {
  classes: PropTypes.object.isRequired,
  porte: PropTypes.bool,
};

export default withStyles(styles)(ElevatorVoyantsPorte);