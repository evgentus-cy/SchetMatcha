<template>
  <div class="match-info-container jumbotron">
    <div class="row">
      <div class="match-date col-12 text-center mb-3">
        <nuxt-link :to="{name: 'sportSlug-tournamentSlug', params: {sportSlug: match.sport_slug, tournamentSlug: match.unique_tournament.slug}}" class="match-tournament-name">
          <div class="match-tournament-logo text-center">
            <img class="img-fluid" :src="match.unique_tournament.logo">
          </div>
          <div class="match-tournament-name">
            {{ match.unique_tournament.name }}
          </div>
        </nuxt-link>
      </div>
      <div class="team-home col-md-5 text-center">
        <div class="match-team-logo">
          <img :src="match.teams[0].logo" :alt="match.teams[0].name">
        </div>
        <div class="match-team-name">
          {{ match.teams[0].name }}
        </div>
      </div>
      <div class="match-info col-md-2 text-center">
        <div class="match-date">
          {{ match.match_date }}
        </div>
        <div class="match-score">
          {{ match.result_score || '-:-' }}
        </div>
      </div>
      <div class="team-away col-md-5 text-center">
        <div class="match-team-logo">
          <img :src="match.teams[1].logo" :alt="match.teams[1].name">
        </div>
        <div class="match-team-name">
          {{ match.teams[1].name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MatchInfo',
    props: ['match']
  }
</script>

<style scoped>
  .match-tournament-logo {
    width: 100px;
    margin: 0 auto;
  }

  .match-score {
    font-size: 32px;
    font-weight: bold;
  }
</style>