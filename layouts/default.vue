<template>
  <div class="container">
    <MainHeader/>
    <b-breadcrumb :items="items"/>
    <div class="row pb-3">
      <div class="col-9">
        <nuxt/>
      </div>
      <RightSideBar/>
    </div>
    <MainFooter/>
  </div>
</template>

<script>
  import MainHeader from '~/components/MainHeader'
  import RightSideBar from '~/components/RightSideBar'
  import MainFooter from '~/components/MainFooter'

  export default {
    components: {
      MainHeader,
      MainFooter,
      RightSideBar
    },
    data () {
      return {
        test: true,
        items: [{
          text: 'Главная',
          href: '/'
        }, {
          text: 'Футбол',
          href: '/soccer'
        }, {
          text: 'Чемпионат мира',
          href: '/soccer/championat'
        }, {
          text: 'Россия - Египет',
          active: true
        }]
      }
    }
  }
</script>