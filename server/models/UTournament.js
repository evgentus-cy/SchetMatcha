'use strict';

const mongoose = require('mongoose')
const UTournamentSchema = require('./schemas/UTournament')
const UTournament = mongoose.model('UTournament', UTournamentSchema, 'unique_tournaments');

module.exports = UTournament
