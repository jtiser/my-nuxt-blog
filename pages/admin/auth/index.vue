<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="elevation-12">
        <v-card-text>
          <v-form>
            <v-text-field
              name="email"
              label="E-Mail Address"
              id="email"
              type="email"
              v-model="email"
            ></v-text-field>
            <v-text-field
              name="password"
              label="Password"
              id="password"
              type="password"
              v-model="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.prevent="onLoginClick">{{ isLogin ? 'Login' : 'Sign Up' }}</v-btn>
          <v-btn
            color="primary"
            @click="isLogin = !isLogin"
          >Switch to {{ isLogin ? 'Signup' : 'Login' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'AdminAuthPage',
  layout: 'admin',

  data() {
    return {
      isLogin: true,
      email: '',
      password: ''
    }
  },
  methods: {
    onLoginClick() {
      this.$axios
        .$post(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            process.env.firebaseApiKey,
          {
            email: this.email,
            password: this.password,
            returnSecureToken: true
          }
        )
        .then(res => {
          console.log('res=', res)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style scoped>
</style>
