import GetMatchesBySport from './queries/GetMatchesBySport.graphql'

export const state = () => ({
  Matches: [],
  Date: new Date()
})

export const mutations = {
  fillStore (state, data) {
    state.Matches = data.Matches
  },

  clearStore (state) {
    state.Matches = []
  }
}

export const actions = {
  async loadData ({ state, commit, error, app }, params) {
    try {
      const client = this.app.apolloProvider.defaultClient
      const response = await client.query({
        query: GetMatchesBySport,
        variables: {
          sportSlug: params.sportSlug,
          date: state.Date
        },
        fetchPolicy: 'network-only',
        cachePolicy: { query: true, data: false }
      })

      if (response.data.Matches !== null) {
        commit('fillStore', response.data)
      } else {
        throw new Error('Matches not found')
      }
    } catch (e) {
      throw new Error(e.message)
    }
  }
}