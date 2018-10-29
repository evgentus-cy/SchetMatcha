<template>
  <div>
    <MatchItem v-for="match in matches"
               :key="match.slug"
               :match="match"
    />
  </div>
</template>

<script>
  import MatchItem from '~/components/MatchItem'

  export default {
    name: 'MatchList',

    components: {
      MatchItem
    },

    props: ['matches']
  }
</script>

<style scoped>

</style>