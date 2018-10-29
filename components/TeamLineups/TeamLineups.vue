<template>
  <div class="team-lineups-container">
    <ul>
      <li v-for="player in players" :key="player.name">{{player.name}} ({{ player.shirt_number || 'n/a' }})</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'TeamLineups',
    props: ['players']
  }
</script>

<style scoped>

</style>