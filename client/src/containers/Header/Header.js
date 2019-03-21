import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import styles from './styles';

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button
            className={classes.button}
            component={Link}
            to="/"
          >
              Elevators
          </Button>
          <Button
            className={classes.button}
            component={Link}
            to="/admin"
          >
            Admin
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);