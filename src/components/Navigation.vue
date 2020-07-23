<template>
  <b-navbar id="nav" toggleable="lg" type="dark" variant="info">
    <div class="container">
      <b-navbar-brand>
        <router-link to="/" role="link">Home</router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav_collapse" />

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto" role="menu">
          <li class="nav-item" role="menuitem">
            <router-link role="link" class="nav-link" to="/">Mechanics</router-link>
          </li>
          <b-nav-item-dropdown text="Game Data" right>
            <b-dropdown-item href="#">Heroes</b-dropdown-item>
            <b-dropdown-item href="#">Artifacts</b-dropdown-item>
            <b-dropdown-item href="#">Items</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Resources" right>
            <b-dropdown-item href="#">Beginner Progression</b-dropdown-item>
            <b-dropdown-item href="#">Raid</b-dropdown-item>
            <b-dropdown-item href="#">Hunt</b-dropdown-item>
            <b-dropdown-item href="#">Expedition</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: 'navigation',
  props: {
    msg: String
  }
}
</script>

<style lang="less">
@import '~../less/variables.less';
</style>
