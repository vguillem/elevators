import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

function AdminData(props) {
  const { classes, data } = props;
  return (
    <div>
      {data.map((action) => {
        return (
          <div>
            elevator { action.elevatorId } requis a l'etage { action.etage }
          </div>
        );
      })}
    </div>
  );
}

AdminData.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminData);