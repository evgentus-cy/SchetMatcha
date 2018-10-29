<template>
  <div>
    <MatchInfo :match="Match"/>

    <div v-if="Match.teams[0].lineups && Match.teams[1].lineups">
      <h2>Стартовые составы</h2>
      <div class="row">
        <div class="col-md-6"
             v-if="Match.teams[0].lineups.start"
        >
          <h3 class="team-lineups-header">Состав {{ Match.teams[0].name }}</h3>
          <TeamLineups :players="Match.teams[0].lineups.start"
          />
        </div>
        <div class="col-md-6"
             v-if="Match.teams[1].lineups.start"
        >
          <h3 class="team-lineups-header">Состав {{ Match.teams[1].name }}</h3>
          <TeamLineups :players="Match.teams[1].lineups.start"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import MatchInfo from '~/components/MatchInfo'
  import TeamLineups from '~/components/TeamLineups'

  export default {

    components: {
      MatchInfo,
      TeamLineups
    },

    computed: {
      Match () {
        return this.$store.state.MatchPage.Match
      },
      getTitle () {
        return `Страница матча ${this.Match.teams[0].name} с ${this.Match.teams[1].name}`
      },
      getDescription () {
        return `Описание матча ${this.Match.teams[0].name} с ${this.Match.teams[1].name}`
      }
    },

    async fetch ({error, store, params}) {
      await store.commit('MatchPage/clearStore', params)
      try {
        await store.dispatch('MatchPage/loadData', params)
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

<style scoped>
  .team-lineups-header {
    font-size: 18px;
  }
</style>