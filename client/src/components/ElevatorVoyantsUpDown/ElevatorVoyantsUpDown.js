import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

import styles from './styles';

function ElevatorVoyantsUpDown(props) {
  const { classes, etat } = props;
  if (etat === 'down') {
    return (
      <span className={classes.upDownIcon}>
      <ArrowDropDown
        fontSize="inherit"
      />
    </span>
    );
  } else if ( etat === 'up') {
    return (
      <span className={classes.upDownIcon}>
      <ArrowDropUp
        fontSize="inherit"
      />
    </span>
    );
  }
  return (
    <span className={classes.upDownIcon}>
      <ArrowDropUp
        fontSize="inherit"
        color="disabled"
      />
      <ArrowDropDown
        fontSize="inherit"
        color="disabled"
      />
    </span>
  );
}

ElevatorVoyantsUpDown.propTypes = {
  classes: PropTypes.object.isRequired,
  etat: PropTypes.string.isRequired,
};

export default withStyles(styles)(ElevatorVoyantsUpDown);