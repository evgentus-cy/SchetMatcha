<template>
  <div>
    <div>
      <img class="img-fluid" src="https://via.placeholder.com/1200x80?text=Ad banner"/>
    </div>
    <b-navbar class="mt-3 mb-3" toggleable="md" type="dark" variant="primary">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">SchetMatcha</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item :to="{name: 'sportSlug', params: {sportSlug: 'soccer'}}">Футбол</b-nav-item>
          <b-nav-item :to="{name: 'sportSlug', params: {sportSlug: 'basketball'}}">Баскетбол</b-nav-item>
          <b-nav-item :to="{name: 'sportSlug', params: {sportSlug: 'ice-hockey'}}">Хоккей</b-nav-item>
          <b-nav-item :to="{name: 'sportSlug', params: {sportSlug: 'tennis'}}">Теннис</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

  </div>
</template>
