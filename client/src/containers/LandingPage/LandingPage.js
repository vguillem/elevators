import React from "react";
import Grid from '@material-ui/core/Grid';

import { BACKEND_URL } from '../../constants';
import Elevator from '../Elevator/Elevator';
import Tableau from '../Tableau/Tableau';
import { elevatorUn, elevatorDeux } from './constants';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elevators: [
        { data: elevatorUn, actif: 3, etageMax: null, etageMin: null, etat: 'stop', porte: false},
        { data: elevatorDeux, actif: 3, etageMax: null, etageMin: null, etat: 'stop', porte: false },
      ],
    };
  }

  awaitTimer = async (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time)
    })
  };

  backendSave = (elevatorId, etage) => {
    const body = JSON.stringify({ elevatorId, etage });
    fetch(`${BACKEND_URL}/elevatorAction`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body,
    })
  };

  moveUp = async (elevatorIndex) => {
    let { elevators } = this.state;
    elevators[elevatorIndex].etat = 'up';
    if (elevators[elevatorIndex].actif < elevators[elevatorIndex].etageMax) {
      await this.awaitTimer(1000);
      elevators[elevatorIndex].actif += 1;
      const awaitEtage = elevators[elevatorIndex].data.some((etage, index) => {
        if (etage.name === elevators[elevatorIndex].actif && etage.requis) {
          elevators[elevatorIndex].data[index].requis = false;
          return true;
        }
      });
      this.setState({elevators});
      if (awaitEtage) {
        elevators = this.state.elevators;
        elevators[elevatorIndex].porte = true;
        this.setState({elevators});
        await this.awaitTimer(5000);
        elevators[elevatorIndex].porte = false;
        this.setState({elevators});
      }
      if (elevators[elevatorIndex].actif < elevators[elevatorIndex].etageMax) {
        this.moveUp(elevatorIndex);
      } else if (elevators[elevatorIndex].etageMin !== null) {
        elevators = this.state.elevators;
        elevators[elevatorIndex].etageMax = null;
        this.moveDown(elevatorIndex);
      } else {
        elevators = this.state.elevators;
        elevators[elevatorIndex].etageMax = null;
        elevators[elevatorIndex].etat = 'stop';
        this.setState({elevators});
      }
    }
  };

  moveDown = async (elevatorIndex) => {
    let { elevators } = this.state;
    elevators[elevatorIndex].etat = 'down';
    if (elevators[elevatorIndex].actif > elevators[elevatorIndex].etageMin) {
      await this.awaitTimer(1000);
      elevators[elevatorIndex].actif -= 1;
      const awaitEtage = elevators[elevatorIndex].data.some((etage, index) => {
        if (etage.name === elevators[elevatorIndex].actif && etage.requis) {
          elevators[elevatorIndex].data[index].requis = false;
          return true;
        }
      });
      this.setState({elevators});
      if (awaitEtage) {
        elevators = this.state.elevators;
        elevators[elevatorIndex].porte = true;
        this.setState({elevators});
        await this.awaitTimer(5000);
        elevators[elevatorIndex].porte = false;
        this.setState({elevators});
      }
      if (elevators[elevatorIndex].actif > elevators[elevatorIndex].etageMin) {
        this.moveDown(elevatorIndex);
      } else if (elevators[elevatorIndex].etageMax !== null) {
        this.moveUp(elevatorIndex);
        elevators = this.state.elevators;
        elevators[elevatorIndex].etageMin = null;
      } else {
        elevators = this.state.elevators;
        elevators[elevatorIndex].etageMin = null;
        elevators[elevatorIndex].etat = 'stop';
        this.setState({elevators});
      }
    }
  };

  move = (elevatorIndex) => {
    const elevator = this.state.elevators[elevatorIndex];
    if (elevator.etat === 'stop') {
      elevator.etageMax ? this.moveUp(elevatorIndex) : this.moveDown(elevatorIndex);
    }
  };

  updateDeplacement = ({ elevatorIndex, buttonIndex }) => {
    const elevators = this.state.elevators;
    if (elevators[elevatorIndex].data[buttonIndex].name > elevators[elevatorIndex].actif) {
      elevators[elevatorIndex].etageMax = elevators[elevatorIndex].etageMax !== null
        ? Math.max(elevators[elevatorIndex].data[buttonIndex].name, elevators[elevatorIndex].etageMax)
        : elevators[elevatorIndex].data[buttonIndex].name
    } else {
      elevators[elevatorIndex].etageMin = elevators[elevatorIndex].etageMin !== null
        ? Math.min(elevators[elevatorIndex].data[buttonIndex].name, elevators[elevatorIndex].etageMin)
        : elevators[elevatorIndex].data[buttonIndex].name
    }
    this.setState({elevators});
    this.move(elevatorIndex);
  };

  requireElevator = ({elevatorIndex, buttonIndex}) => {
    const { elevators } = this.state;
    if (elevators[elevatorIndex].data[buttonIndex].name !== elevators[elevatorIndex].actif) {
      elevators[elevatorIndex].data[buttonIndex].requis = true;
      this.setState({elevators});
      this.backendSave(elevatorIndex, elevators[elevatorIndex].data[buttonIndex].name);
      this.updateDeplacement({elevatorIndex, buttonIndex});
    }
  };

  render() {
    return (
      <div>
        {
          this.state.elevators.map((elevator, index) =>
          <Grid
            container
            justify="space-around"
          >
            <Grid xs={12} sm={5}>
              <Elevator
                elevatorIndex={index}
                etages={elevator.data}
                action={this.requireElevator}
                etat={elevator.etat}
                porte={elevator.porte}
              />
            </Grid>
            <Grid xs={12} sm={5}>
              <Tableau
                elevatorIndex={index}
                etages={elevator.data}
                action={this.requireElevator}
                actif={elevator.actif}
              />
            </Grid>
          </Grid>)
        }
      </div>
    )
  }
}

export default LandingPage;