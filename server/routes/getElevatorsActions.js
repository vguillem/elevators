const Joi = require('joi');

const Elevator = require('../models/elevator');

const SCHEMA = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

function validate(params) {
  const result = Joi.validate(params, SCHEMA);
  if (result.error) {
    return {error: result.error};
  }
  return {
    login: params.login,
    password: params.password,
  };
}

const getElevatorsActions = async (req, res) => {
  const { error, login, password } = validate(req.query);
  if ( error ) {
    res.status(500).json({error})
  } else if (login !== 'admin' || password !== 'admin') {
    res.status(401).json({ error: true });
  } else {
    const data = await Elevator.find({}).lean();
    res.json({ data });
  }
};

module.exports = getElevatorsActions;