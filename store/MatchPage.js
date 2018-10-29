import GetMatch from './queries/GetMatch.graphql'

export const state = () => ({
  Match: {}
})

export const mutations = {
  fillStore (state, data) {
    state.Match = data.Match
  },

  clearStore (state) {
    state.Match = {}
  }
}

export const actions = {
  async loadData ({ commit, error, app }, params) {
    try {
      const client = this.app.apolloProvider.defaultClient
      const response = await client.query({
        query: GetMatch,
        variables: {
          slug: params.matchSlug
        },
        fetchPolicy: 'network-only',
        cachePolicy: { query: true, data: false }
      })

      if (response.data.Match !== null) {
        commit('fillStore', response.data)
      } else {
        throw new Error('Match not found')
      }
    } catch (e) {
      throw new Error(e.message)
    }
  }
}