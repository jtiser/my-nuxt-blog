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
          <v-btn color="primary" @click.prevent="onLoginClick">{{
            signUp ? 'Sign up' : 'Sign in'
          }}</v-btn>
          <v-btn color="primary" @click="signUp = !signUp"
            >Switch to {{ signUp ? 'Sign in' : 'Sign up' }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import {
  actionTypes as authenticationActions,
  name as authenticationModule
} from '@/store/authentication'

export default {
  name: 'AdminAuthPage',
  layout: 'admin',

  data() {
    return {
      signUp: true,
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(authenticationModule, [
      authenticationActions.authenticateUser
    ]),
    async onLoginClick() {
      try {
        await this.authenticateUser({
          email: this.email,
          password: this.password,
          signUp: this.signUp
        })
        this.$router.push('/admin')
      } catch (exception) {
        console.log(exception)
      }
    }
  }
}
</script>
