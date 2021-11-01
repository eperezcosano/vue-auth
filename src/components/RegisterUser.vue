<template>
  <div>
    <form @submit.prevent="register">
      <label for="email">
        Email:
      </label>
      <input v-model="email" type="email" name="email" required value>
      <label for="password">
        Password:
      </label>
      <input v-model="pass" type="password" name required value>
      <p v-if="msg">
        {{ msg }}
      </p>

      <button type="submit" name="button">
        Register
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterUser',
  data () {
    return {
      email: '',
      pass: '',
      msg: ''
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push({ name: 'dashboard' })
    }
  },
  methods: {
    register() {
      console.log('click')
      this.$store
          .dispatch('auth/register', {
            email: this.email,
            pass: this.pass
          })
          .then((data) => { this.msg = data.response?.data?.msg })
          .catch(err => { this.msg = err.response?.data?.msg })
    }
  }
}
</script>
