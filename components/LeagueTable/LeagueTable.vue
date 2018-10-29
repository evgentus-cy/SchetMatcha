<template>
  <div class="table-responsive">
    <h2>Турнирная таблица</h2>
    <table class="table table-bordered table-sm">
      <tr>
        <th>#</th>
        <th>Команда</th>
        <th>W:D:L</th>
        <th>Кол-во матчей</th>
        <th>Очки</th>
      </tr>
      <tr v-for="standing in standings" :key="standing.team.slug">
        <td>{{ standing.position_total }}</td>
        <td>{{ standing.team.name }}</td>
        <td>{{ standing.win_total }}:{{ standing.draw_total }}:{{ standing.loss_total }}</td>
        <td>{{ standing.matches_total }}</td>
        <td>{{ standing.points_total }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'LeagueTable',

    props: ['standings']
  }
</script>

<style scoped>

</style>