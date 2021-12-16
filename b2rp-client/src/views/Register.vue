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
      <v-card-title class="display-6 pt-5">
        Please fill in the form to register
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
        name=""
        rules="required"
      >
        <v-text-field
          v-model="name"
          @change="clearAlert"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|email"
      >
        <v-text-field
          v-model="email"
          @change="clearAlert()"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </validation-provider>

       <validation-provider
        v-slot="{ errors }"
        name="phoneNumber"
        :rules="{
          required: true,
          regex: '^(60)'
        }"
      >
        <v-text-field
          v-model="phone_num"
          @change="clearAlert()"
          :error-messages="errors"
          label="Phone Number"
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
          @change="clearAlert()"
          :error-messages="errors"
          input type="password"
          label="Password"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="password_confirm"
        
        rules="required"
      >
        <v-text-field
          v-model="password_confirm"
          @onchange="clearAlert()"
          :error-messages="errors"
          input type="password"
          label="Password Confirmation"
          required
        ></v-text-field>
      </validation-provider>

     
      <v-row class="my-2" justify="center">
        <v-btn
        
        class="mr-4 white--text"
        type="submit"
        color="cyan"
        :disabled="invalid"
        @click="register"
      >
        submit
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
      <div>Already register? Click <a href="/login">here</a></div>
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
    message: 'This field is required',
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
        name: '',
        email: '',
        password: '',
        password_confirm: '',
        phone_num: '',
        error: null,
        success: null

    }),

    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.email = ''
        this.phone_num=''
        this.password = ''
        this.password_confirm = ''
        this.$refs.observer.reset()
      },

      clearAlert(){
        this.error=null
        this.success=null
      },

      async register (){
        try{
          const response = await AuthenticationService.register({
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirm: this.password_confirm,
            phone_num: this.phone_num
          })
          
          console.log("Respond Status: "+response.status)
          console.log(response.data)
          if(response.status==200){
            this.success = response.data.message
          }
          
        }catch(error){
          console.log("Respond Status: "+error.response.status)
          console.log(error.response.data.error)
          this.error = error.response.data.error
        }  
      }
    },
  }

</script>

