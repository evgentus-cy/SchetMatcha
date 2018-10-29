'use strict';

const mongoose = require('mongoose')
const MatchSchema = require('./schemas/Match')
const Match = mongoose.model('Match', MatchSchema, 'matches');

module.exports = Match
