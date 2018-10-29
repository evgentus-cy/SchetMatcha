'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TeamSchema = require('./Team')
const UTournamentSchema = require('./UTournament')

const MatchSchema = new Schema({
  _id: String,
  match_date: Date,
  slug: String,
  teams: [TeamSchema],
  unique_tournament: UTournamentSchema,
  sport_slug: String,
  hidden: Boolean,
  is_live: Boolean,
  is_active: Boolean,
  is_finished: Boolean,
  result_postponed: Boolean,
  result_canceled: Boolean,
  result_score: String,
  result_scores: Object,
  status: {
    code: Number,
    name: {
      en: String,
      ru: String
    }
  }
})

module.exports = MatchSchema