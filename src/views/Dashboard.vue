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
      users: []
    }
  },
  created() {
    this.$store.dispatch('dashboard/getUsers').then((res) => {
      this.users = res
    })
  }
}
</script>

<style>

</style>
