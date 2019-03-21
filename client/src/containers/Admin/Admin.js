import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import styles from './styles';
import { BACKEND_URL } from '../../constants';
import AdminData from '../../components/AdminData/AdminData';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      data: [],
      loginError: false,
    };
  }

  callApi = async () => {
    const { login, password } = this.state;
    const response = await fetch(`${BACKEND_URL}/elevatorsActions?login=${login}&password=${password}`);
    const data = await response.json();
    return data;
  };

  login() {
    this.callApi()
      .then((res) => {
        if (res.data) {
          this.setState({ data: res.data });
        } else {
          this.setState({ data: true });
        }

      })
      .catch(err => console.log(err));
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { data, login, password } = this.state;
    if (data.length > 0) {
      return (
        <div className={classes.pannel}>
          <AdminData data={data}/>
        </div>
      );
    }
    return (
      <div className={classes.pannel}>
        <TextField
          label="Login"
          value={login}
          onChange={this.handleChange('login')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          value={password}
          onChange={this.handleChange('password')}
          margin="normal"
          variant="outlined"
          type="password"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.login.bind(this)}
        >
          Login
        </Button>
      </div>
    )
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);