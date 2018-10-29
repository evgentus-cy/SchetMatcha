'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CountrySchema = new Schema({
  name: String,
  name_ru: String,
  name_gen_ru: String,
  slug: String,
  iso: String,
  ioc: String
})

module.exports = CountrySchema