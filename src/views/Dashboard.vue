<template>
  <div>
    <h1>Dashboard</h1>
    <ul v-for="user in users" :key="user._id">
      <li>{{ user.email }}</li>
    </ul>
  </div>
</template>

<script>


export default {
  name: 'Dashboard',
  components: {},
  computed: {
    users() {
      return this.$store.state.dashboard.userList
    }
  },
  created() {
    this.$store.dispatch('dashboard/getUsers')
  }
}
</script>

<style>

</style>
