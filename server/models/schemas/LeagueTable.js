'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LeagueTableSchema = new Schema({
  team_id: String,
  season_id: String,
  league_table_name: String,
  position_total: Number,
  win_total: Number,
  draw_total: Number,
  loss_total: Number,
  points_total: Number,
  matches_total: Number
})

module.exports = LeagueTableSchema