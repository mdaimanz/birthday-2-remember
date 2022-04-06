<template>
  <div class="">
    <v-app>
    
    <v-navigation-drawer app expand-on-hover>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Birthday2Remember
          </v-list-item-title>
          <v-list-item-subtitle>
            Hi {{$store.state.user.name}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in dashboard_items"
          :key="item.title"
          :to="item.path"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
      
    </v-navigation-drawer>

    <v-app-bar app class="cyan lighten-3 white--text">

      <v-toolbar-title>Checkout</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon v-if="$store.state.isUserLoggedIn" @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      <v-btn
      v-if="!$store.state.isUserLoggedIn"
      class="mr-2 cyan--text"
      color="white"
      to="/login"
      >
      Login
      </v-btn>

  
    </v-app-bar>

    <v-main>
    <v-row justify="center">
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
    </v-row>
    <v-card
    class="mx-auto my-12 pt-10"
    max-width="500"
    >
    
    <v-row justify="center">
      <v-card-title class="display-1 pt-5">
        Payment
      </v-card-title>
    </v-row>
    <v-card-text>     
    </v-card-text>
  
    <validation-observer
    ref="observer"
    v-slot="{ invalid }"
    >
    <form class="px-10" @submit.prevent="handleSubmit">

      <validation-provider
        v-slot="{ errors }"
        name=""
        rules="required"
      >
        <v-text-field
          v-model="name"
          @change="clearAlert"
          :error-messages="errors"
          id="name_field"
          label="Name"
          required
        ></v-text-field>
      </validation-provider>

       <validation-provider
        v-slot="{ errors }"
        name="address"
        :rules="{
          required: true,
        }"
      >
        <v-text-field
          v-model="address"
          @change="clearAlert()"
          :error-messages="errors"
          label="Address"
          id="address_field"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="city"
        :rules="{
          required: true,
        }"
      >
        <v-text-field
          v-model="city"
          @change="clearAlert()"
          :error-messages="errors"
          label="City"
          id="city_field"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="state"
        :rules="{
          required: true,
        }"
      >
        <v-text-field
          v-model="state"
          @change="clearAlert()"
          :error-messages="errors"
          label="State"
          id="state_field"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="zip"
        :rules="{
          required: true,
        }"
      >
        <v-text-field
          v-model="zip"
          @change="clearAlert()"
          :error-messages="errors"
          label="Zip"
          id="zip_field"
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

      <div class="">
          <label for="card_field">Credit Card</label>
          <div id="stripe-element-mount-point"></div>
      </div>
      
      <v-row class="my-2" justify="center">
        <v-card-actions>
        </v-card-actions>
      </v-row>
     
      <v-row class="my-2" justify="center">
        <v-btn
        class="mr-4 white--text"
        type="submit"
        color="cyan"
        :disabled="invalid"
      >
        pay
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

  </v-card>
    </v-main>
      <v-footer bottom padless app class="mt-10">
    <v-col
      class="cyan lighten-3 white--text text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>Birthday 2 Remember Platform</strong>
    </v-col>
  </v-footer>
    </v-app>
 


    
  </div>
</template>

<script>
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import { loadStripe } from "@stripe/stripe-js";
import PaymentService from '@/services/PaymentService'

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
  const style = {
  style: {
    base: {
      iconColor: "#000",
      color: "#000",
      fontWeight: "800",
      fontFamily: "Press Start 2P",
      fontSize: "12px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883"
      },
      "::placeholder": {
        color: "grey"
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "red"
    }
  }
  };
 
 export default {
   components: {
      ValidationProvider,
      ValidationObserver,
    },
   data(){
     return{
       dashboard_items: [
          { title: 'Home', icon: 'mdi-home' , path: '/userdashboard' },
          { title: 'Reminder', icon: 'mdi-calendar-month', path: '/reminder' },
          { title: 'Shop', icon: 'mdi-shopping', path: '/shop' },
          { title: 'Cart', icon: 'mdi-cart', path: '/cart' },
          { title: 'Order', icon: 'mdi-bookmark', path: '/custorder' },
          { title: 'Setting', icon: 'mdi-account-cog', path: '/usersetting' },
        ],
        stripe: null,
        elements: null,
        loading: true,
        error: null,
        success: null,

        name: null,
        address: null,
        city:null,
        state: null,
        zip: null,
        email: null,
        details: [],
        
     }
   },
   async mounted (){
     const ELEMENT_TYPE = "card"
     this.stripe = await loadStripe('pk_test_51K3V16JInS7TPGr6AOoBGQ3aurGYWuY9JBRlw3w76UrrOzjeJZYeNoyjaZaJWYDHvPy3od29NxDX93C7kXkLqsZ700fQAjhXXM')
     this.elements = this.stripe.elements();
     const element = this.elements.create(ELEMENT_TYPE, style);
     element.mount("#stripe-element-mount-point");
     this.loading = false;
   },
   
   methods:{
     submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.name=null
        this.address=null
        this.city=null
        this.state=null
        this.zip=null
        this.email=null
        this.$refs.observer.reset()
      },
      clearAlert(){
        this.error=null
        this.success=null
      },
     logout(){
       console.log("Logout")
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({name: 'Home'})
     },

     async handleSubmit(){
      console.log("here", this.name, this.email, this.address, this.city, this.state, this.zip);
      const billingDetails ={
        name: this.name,
        email: this.email,
        address: {
          city: this.city,
          line1: this.address,
          state: this.state,
          postal_code: this.zip
        }
      }
      const cardElement = this.elements.getElement("card");

      try{
        let api = "http://localhost:8081/createPaymentIntent/"+this.$store.state.user.id
        const response = await fetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
        });
        const { secret } = await response.json();
        console.log("secret", secret);
        
        // console.log("secret", secret);
        const paymentMethodReq = await this.stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: billingDetails
        });
        console.log("error?", paymentMethodReq);
        const { error } = await this.stripe.confirmCardPayment(secret, {
          payment_method: paymentMethodReq.paymentMethod.id
        });

        console.log("error?", error);
        const response2 = (await PaymentService.addToOrder(this.$store.state.user.id))
        console.log(response2.data)

        const details ={
          name: this.name,
          email: this.email,
          address: {
            city: this.city,
            line1: this.address,
            state: this.state,
            postal_code: this.zip
          }
        }
        const response4 = (await PaymentService.savePaymentRecord(this.$store.state.user.id, details))
        console.log(response4.data)

        const response3 = (await PaymentService.deleteFromCart(this.$store.state.user.id))
        console.log(response3.data)
        
        this.$router.push({name: 'PaymentSuccess'})
      }catch(error){
        this.error = "Payment unsuccessful"
        console.log("error", error)
      }
      
     }
   }
 }
    
</script>
