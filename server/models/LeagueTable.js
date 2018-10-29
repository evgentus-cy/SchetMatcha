'use strict';

const mongoose = require('mongoose')
const LeagueTableSchema = require('./schemas/LeagueTable')
const LeagueTable = mongoose.model('LeagueTable', LeagueTableSchema, 'leaguetable');

module.exports = LeagueTable
