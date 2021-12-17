<template>
  <div class="">
    <v-toolbar  elevation="10">
      <img class="mr-3 my-5" :src="require('../assets/Untitled-1.png')" height="60" width="180" />
      <v-toolbar-title></v-toolbar-title>
      <v-col class="text-left my-5">
        <v-btn
        class=""
        plain
        color="cyan"
        to="/"
        >
          Home
        </v-btn>
        <v-btn
          class=""
          plain
          color="cyan"
        >
          Shop
        </v-btn>
        <v-btn
          class=""
          plain
          color="cyan"
        >
          Posts
        </v-btn>
        <v-btn
          class=""
          plain
          color="cyan"
        >
          Location
        </v-btn>
        
        <v-btn
          class=""
          plain
          color="cyan"
        >
          About Us
        </v-btn>
      </v-col>
    

    <v-col class="text-right my-5">
      <v-btn
      class="mr-2 white--text"
      color="cyan"
      to="/login"
    >
      Login
    </v-btn>
    <v-btn
      class="mr-5"
      outlined
      color="cyan"
      to="/register"
    >
      Register
    </v-btn>
    </v-col>
    </v-toolbar> 

    <v-main>

      <!-- error alert -->
      <v-alert
      dense
      outlined
      class="ma-5"
      type="error"
      v-if="error"
    >
    {{error}}
    </v-alert>

    <v-alert
      dense
      text
      class="ma-5"
      type="success"
      v-if="success"
    >
      {{success}}
    </v-alert>
    <v-card
    :loading="loading"
    class="mx-auto my-12 pt-10"
    max-width="500"
    >

    <v-row justify="center">
      <v-card-title class="display-1 pt-5">
        Welcome back!
      </v-card-title>
    </v-row>
    <v-card-text>     
    </v-card-text>

    
      <validation-observer
    
    
    ref="observer"
    v-slot="{ invalid }"
  >
    <form class="px-10" @submit.prevent="submit">
      <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|email"
      >
        <v-text-field
          v-model="email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="password"
        
        rules="required"
      >
        <v-text-field
          v-model="password"
          :error-messages="errors"
          input type="password"
          label="Password"
          required
        ></v-text-field>
      </validation-provider>
      <v-row class="my-2" justify="center">
        <v-btn
        
        class="mr-4 white--text"
        type="submit"
        color="cyan"
        :disabled="invalid"
        @click="login"
      >
        login
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
      </v-row>
      
    </form>
  </validation-observer>

    

    <v-row justify="center">
      <v-card-actions>
      
    </v-card-actions>
    </v-row>

    <v-row class="pa-2 grey--text" justify="center">
      <div>Not yet registered? Click <a href="/register">here</a></div>
    </v-row>
    
    

  </v-card>
    </v-main>

    <v-footer fixed bottom padless class="">
    <v-col
      class="cyan lighten-3 white--text text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>Birthday 2 Remember Platform</strong>
    </v-col>
  </v-footer>
  </div>
</template>

<script>
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import AuthenticationService from '@/services/AuthenticationService'

setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      email: '',
      password: '',
      error: null,
      success: null
    }),

    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.email = ''
        this.password = ''
        this.$refs.observer.reset()
      },

      async login(){
        try{
          
          const response = await AuthenticationService.login({
            email: this.email,
            password: this.password,
          })
          console.log(response.data)
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push({name: 'UserDashboard'})
          
        }catch(error){
          console.log("Respond Status: "+error.response.data.status)
          console.log(error.response.data.error)
          this.error = error.response.data.error
        }
      }
    },
  }

</script>

