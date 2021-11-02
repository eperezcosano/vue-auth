<template>
  <form @submit.prevent="login">
    <label>Email</label>
    <input v-model="email" type="email" name="email" value>

    <label>Password</label>
    <input v-model="pass" type="password" name value>

    <p v-if="errMsg">{{ errMsg }}</p>

    <button type="submit">Login</button>
  </form>
</template>

<script>
export default {
  name: 'LoginUser',
  data () {
    return {
      email: '',
      pass: '',
      errMsg: null
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters['auth/isLogged']
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push({ name: 'dashboard' })
    }
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login', {
            email: this.email,
            pass: this.pass
          })
          .then(() => { this.$router.push({ name: 'dashboard' }) })
          .catch(err => { this.errMsg = err })
    }
  }
}
</script>
