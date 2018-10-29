'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CountrySchema = require('./Country')

const UTournamentSchema = new Schema({
  name: String,
  name_ru: String,
  logo: String,
  slug: String,
  sport_slug: String,
  country: CountrySchema
})

module.exports = UTournamentSchema