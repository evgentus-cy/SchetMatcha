'use strict';

const mongoose = require('mongoose')
const TeamSchema = require('./schemas/Team')
const Team = mongoose.model('Team', TeamSchema, 'squad');

module.exports = Team
