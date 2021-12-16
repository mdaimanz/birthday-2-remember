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
          to="/news"
        >
          News
        </v-btn>
        <v-btn
          class=""
          plain
          color="cyan"
          to="/location"
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
    <v-main class="pt-3">
      
      <v-row justify="center" class="pa-4">
        <v-responsive justify="center" max-width="1300" max-height="">
          <v-card-text>
            <v-carousel cycle hide-delimiters 
            class="rounded-xl">
              <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
              ></v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-responsive>
        
      </v-row>
      
      <v-row class="pt-10"><v-divider></v-divider></v-row>

      <v-row justify="center" class="pa-10">
        
        <div class="display-1">
          Daily News
        </div>
      </v-row>

      <v-row justify="center" class="pt-1">
        <v-col>
          <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
          ></v-img>

          <v-card-title>
            Top western road trips
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="cyan"
              text
            >
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-col>

        <v-col>
          <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
          ></v-img>

          <v-card-title>
            Top western road trips
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="cyan"
              text
            >
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-col>

        <v-col>
          <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
          ></v-img>

          <v-card-title>
            Top western road trips
          </v-card-title>

          <v-card-subtitle>
            1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="cyan"
              text
            >
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-col>
        
   
    </v-row>

    </v-main>


    <v-footer app bottom padless  class="mt-10">
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
 export default {
   data(){
     return{
       items: [
          {
            src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1089&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1566121933407-3c7ccdd26763?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1173&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1586985289906-406988974504?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
          },
        ],
     }
   },
   //sample method
   methods:{
     addTask(){
       let newTask = {
         id: Date.now(),
         title: this.newTaskTitle,
         done: false
       }
       this.tasks.push(newTask);
       this.newTaskTitle = ''
     },
     doneTask(id){
       let task = this.tasks.filter(task => task.id === id)[0]
       task.done = !task.done
     },
     deleteTask(id){
       this.tasks = this.tasks.filter(task => task.id !== id)
     }
   }
 }
    
</script>
