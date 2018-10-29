import GetUTournament from './queries/GetUTournament.graphql'

export const state = () => ({
  UTournament: {}
})

export const mutations = {
  fillStore (state, data) {
    state.UTournament = data.UTournament
  },

  clearStore (state) {
    state.UTournament = {}
  }
}

export const actions = {
  async loadData ({ commit, error, app }, params) {
    try {
      const client = this.app.apolloProvider.defaultClient
      const response = await client.query({
        query: GetUTournament,
        variables: {
          sportSlug: params.sportSlug,
          tournamentSlug: params.tournamentSlug
        },
        fetchPolicy: 'network-only',
        cachePolicy: { query: true, data: false }
      })

      if (response.data.UTournament !== null) {
        commit('fillStore', response.data)
      } else {
        throw new Error('UTournament not found')
      }
    } catch (e) {
      throw new Error(e.message)
    }
  }
}