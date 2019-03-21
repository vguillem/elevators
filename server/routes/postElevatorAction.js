const Joi = require('joi');

const Elevator = require('../models/elevator');

const SCHEMA = Joi.object().keys({
  elevatorId: Joi.number().required(),
  etage: Joi.number().required(),
});

function validate(params) {
  const result = Joi.validate(params, SCHEMA);
  if (result.error) {
    return {error: result.error};
  }
  return {
    elevatorId: params.elevatorId,
    etage: params.etage,
  };
}

const postElevatorAction = async (req, res) => {
  const { error, elevatorId, etage } = validate(req.body);
  if ( error ) res.status(500).json({error});

  const elevator = new Elevator({ elevatorId, etage });
  await elevator.save();
  res.json({ ok: 'ok' });
};

module.exports = postElevatorAction;