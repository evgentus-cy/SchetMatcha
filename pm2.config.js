module.exports = {
  apps : [{
    name      : 'SiteFront',
    exec_mode : 'cluster',
    instances : 'max',
    script    : './node_modules/nuxt/bin/nuxt-start',
  }, {
    name      : 'GqlServer',
    exec_mode : 'cluster',
    instances : 'max',
    script    : './server/graphql.js',
  }]
};