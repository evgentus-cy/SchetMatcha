'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CountrySchema = require('./Country')

const TeamSchema = new Schema({
  _id: String,
  logo: String,
  name: String,
  name_ru: String,
  slug: String,
  country: CountrySchema,
  lineups: Object
})

module.exports = TeamSchema