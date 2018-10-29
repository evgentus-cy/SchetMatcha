<template>
  <div>
    <h1>{{ UTournament.name }}</h1>
    <div v-if="UTournament && UTournament.upcoming_matches">
      <h2>Предстоящие матчи</h2>
      <MatchList :matches="UTournament.upcoming_matches"/>
    </div>
    <div v-if="UTournament && UTournament.past_matches">
      <h2>Прошедшие матчи</h2>
      <MatchList :matches="UTournament.past_matches"/>
    </div>
    <div v-if="UTournament.standings && UTournament.standings.length">
      <LeagueTable :standings="UTournament.standings"/>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import MatchList from '~/components/MatchList'
  import LeagueTable from '~/components/LeagueTable'

  export default {

    components: {
      MatchList,
      LeagueTable
    },

    computed: {
      UTournament () {
        return this.$store.state.UTournamentPage.UTournament
      },
      getTitle () {
        return this.UTournament.name && `Страница турнира ${this.UTournament.name}`
      },
      getDescription () {
        return this.UTournament.name && `Описание турнира ${this.UTournament.name}`
      }
    },

    async fetch ({error, store, params}) {
      await store.commit('UTournamentPage/clearStore', params)
      try {
        await store.dispatch('UTournamentPage/loadData', params)
      } catch (e) {
        error({ statusCode: 404, message: 'Not found' })
      }
    },

    head () {
      return {
        title: this.getTitle,
        meta: [
          { hid: 'description', name: 'description', content: this.getDescription }
        ]
      }
    }
  }
</script>