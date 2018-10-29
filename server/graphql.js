const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const moment = require('moment')
const config = require('./config')
const GenerateProjection = require('./helpers/ProjectionHelpers').GenerateProjection

const MatchSchema = require('./models/schemas/Match')
const LeagueTableSchema = require('./models/schemas/LeagueTable')
const UTournamentSchema = require('./models/schemas/UTournament')
const TeamSchema = require('./models/schemas/Team')

const Match = require('./models/Match')
const LeagueTable = require('./models/LeagueTable')
const UTournament = require('./models/UTournament')
const Team = require('./models/Team')

// TODO: Схему распихать файлам

const typeDefs = gql`
  type ScoreType {
    type: String
    value: String
  }
  
  type PlayerType {
    name: String
    logo: String
    shirt_number: String
  }
  
  type LineupsType {
    start: [PlayerType]
    reserve: [PlayerType]
  }

  type CountryType {
    name: String
    name_gen_ru: String
    slug: String
    iso: String
  }
  
  type StandingsType {
     team: TeamType
     league_table_name: String,
     position_total: Int
     win_total: Int
     draw_total: Int
     loss_total: Int
     points_total: Int
     matches_total: Int
  }
  
  type UTournamentType {
    name: String,
    logo: String,
    slug: String,
    sport_slug: String,
    country: CountryType
    standings: [StandingsType]
    upcoming_matches(limit: Int): [MatchType]
    past_matches(limit: Int): [MatchType]
  }

  type TeamType {
    slug: String
    logo: String
    short_name: String
    name: String
    country: CountryType
    lineups: LineupsType
  }

  type MatchType {
    _id: ID
    slug: String
    sport_slug: String
    match_date: String
    teams: [TeamType]
    result_score: String
    result_scores: [ScoreType]
    unique_tournament: UTournamentType
    join_matches: [MatchType]
  }

  type Query {
    Matches(sportSlug: String, UTournamentSlug: String, date: String): [MatchType]
    Match(slug: String!): MatchType
    UTournament(slug: String!, sportSlug: String!): UTournamentType
  }
`

// TODO: Разобрать лапшу из резолверов

const resolvers = {
  MatchType: {

    // Очные встречи
    join_matches: async (obj) => {
      try {
        const fields = Object.keys(MatchSchema.paths).join(' ')

        return await Match.find({
          sport_slug: obj.sport_slug,
          'teams.id': { $all: [obj.teams[0].id, obj.teams[1].id] },
          is_finished: true,
          match_date: { $lt: moment(obj.match_date).toISOString() }
        }).select(fields)

      } catch (e) {
        return []
      }
    },

    // Приводим к нормальному виду
    result_scores: (obj) => {
      return Object.values(obj.result_scores)
    }
  },

  LineupsType: {
    start: (obj) => {
      return Object.values(obj.start)
    },
    reserve: (obj) => {
      return Object.values(obj.reserve)
    }
  },

  TeamType: {
    name: (obj) => {
      return obj.name_ru || obj.name || null
    },
    logo: (obj) => {
      return obj.logo ? `https://s15742.cdn.ngenix.net${obj.logo.replace('/origin/', '/w150-h150/')}` : null
    }
  },

  UTournamentType: {
    name: (obj) => {
      return obj.name_ru || obj.name || null
    },
    logo: (obj) => {
      return obj.logo ? `https://s15742.cdn.ngenix.net${obj.logo.replace('/origin/', '/w150-h150/')}` : null
    },
    standings: async (obj) => {
      try {
        const fields = Object.keys(LeagueTableSchema.paths).join(' ')

        let lastSeason = await LeagueTable.findOne({
          league_slug: obj.slug,
          sport_slug: obj.sport_slug
        }).select('season_id').sort({ season_start: -1 })

        return (lastSeason) ? await LeagueTable.find({
          league_slug: obj.slug,
          sport_slug: obj.sport_slug,
          season_id: lastSeason.season_id
        }).select(fields).sort({ league_table_id: 1, position_total: 1 }) : [] ;

      } catch (e) {
        console.error(e.message)
        return {}
      }
    },
    upcoming_matches: async (obj, args) => {
      try {
        const fields = Object.keys(MatchSchema.paths).join(' ')

        return await Match.find({
          'status.code': 0,
          is_live: false,
          match_date: { $gt: moment().toISOString() },
          sport_slug: obj.sport_slug,
          league_slug: obj.slug,
          hidden: {$ne: true}
        }).limit(7).select(fields).sort({match_date: 1})

      } catch (e) {
        console.error(e.message)
        return []
      }
    },
    past_matches: async (obj, args) => {
      try {
        const fields = Object.keys(MatchSchema.paths).join(' ')

        return await Match.find({
          'status.code': {$in: [100, 110, 120, 130]},
          is_finished: true,
          sport_slug: obj.sport_slug,
          league_slug: obj.slug,
          match_date: { $lt: moment().toISOString() },
          hidden: {$ne: true}
        }).limit(7).select(fields).sort({match_date: -1})

      } catch (e) {
        console.error(e.message)
        return []
      }
    }
  },

  StandingsType: {
    team: async (obj) => {
      try {
        const fields = Object.keys(TeamSchema.paths).join(' ')
        return await Team.findOne({ _id: obj.team_id }).select(fields)
      } catch (e) {
        return {}
      }
    }
  },

  PlayerType: {
    name: (obj) => {
      return obj.name_ru || obj.name || null
    },
    logo: (obj) => {
      return obj.logo ? `https://s15742.cdn.ngenix.net${obj.logo.replace('/origin/', '/w150-h150/')}` : null
    }
  },

  Query: {
    Matches: async (obj, args, context, info) => {
      try {
        const projections = GenerateProjection(info)

        let matches = []

        // TODO: refactoring, make query builder

        if (args.sportSlug) {
          const currentDate = moment().startOf('day').utc()
          const startDate = moment(args.date).startOf('day').utc()
          const endDate = moment(args.date).endOf('day').utc()

          // Dummy check
          if (startDate.diff(currentDate, 'days') > 2) {
            throw new Error(`Date far in the future`)
          }

          matches = await Match.find({
            match_date: {
              $gte: startDate,
              $lte: endDate
            },
            sport_slug: args.sportSlug,
            'unique_tournament.priority': {$ne: 5},
            hidden: {$ne: true}
          }).select(projections).sort({match_date: 1})
        }

        if (args.UTournamentSlug) {
          matches = await Match.find({
            'league_slug': args.UTournamentSlug,
            match_date: {
              $gt: startDate,
              $lt: endDate
            }
          }).select(projections)
        }

        return matches
      } catch (e) {
        console.error('Error: ', e.message)
        throw new Error(e.message)
      }
    },
    Match: async (obj, args) => {
      try {
        const fields = Object.keys(MatchSchema.paths).join(' ')

        return await Match.findOne({ slug: args.slug }).select(fields)
      } catch (e) {
        console.error('Error: ', e.message)
        return {}
      }
    },
    UTournament: async (obj, args) => {
      try {
        const fields = Object.keys(UTournamentSchema.paths).join(' ')

        return await UTournament.findOne({ slug: args.slug, sport_slug: args.sportSlug }).select(fields)

      } catch (e) {
        console.error('Error: ', e.message)
        return {}
      }
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

// Start server
const startServer = function() {
  server.listen().then(({ url }) => {
    console.log(`GQL server ready at ${url}`)
  })
}

// Connect with mongodb
const connectDb = function() {
  //mongoose.Promise = bluebird;
  mongoose.connect(config.mongodb.dsn, { useNewUrlParser: true })
  return mongoose.connection
}

connectDb().on('error', console.error).on('disconnected', connectDb).on('open', startServer)
