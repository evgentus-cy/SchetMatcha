<template>
  <div>
    <nuxt-link v-if="match.sport_slug && match.unique_tournament && match.unique_tournament.slug && match.slug" class="match-link-container" :to="{name: 'sportSlug-tournamentSlug-matchSlug', params: {sportSlug: match.sport_slug, tournamentSlug: match.unique_tournament.slug, matchSlug: match.slug}}">
      <div>{{ match.teams[0].name }}</div>
      <div>{{ match.result_score }}</div>
      <div>{{ match.teams[1].name }}</div>
    </nuxt-link>
  </div>

</template>

<script>
  export default {
    name: 'MatchItem',

    props: ['match']
  }
</script>

<style scoped>
  .match-link-container {
    display: block;
  }
</style>