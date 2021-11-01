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
  data() {
    return {
      isLoading: false,
      users: []
    }
  },
  created() {
    this.$store
        .dispatch('dashboard/getUsers')
        .then(data => { this.users = data })
  }
}
</script>

<style>

</style>
