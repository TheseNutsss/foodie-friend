<template>
     <v-btn
          variant="text" 
          class="text-indigo-accent-3"
          block
          @click="dialog = true"
        >
          <slot></slot>
        </v-btn>
     <v-dialog v-model="dialog" width="400" :elevation="20">

      <v-card>
        <v-card-text>
           <v-btn
          variant="text" 
          block
          prepend-icon="mdi-google"
          class="bg-grey-lighten-3 mb-1"
          @click="$store.dispatch('signInWithGoogle')"
        >
          Войти с помощью Google
        </v-btn>
         <v-btn
          variant="text" 
          block
          prepend-icon="mdi-facebook"
          class="bg-grey-lighten-3"
        >
          Войти с помощью Facebook
        </v-btn>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'my-pop-up',
    data (){
        return {
            dialog: false
        }
    }
}
</script>

<style>

</style>
