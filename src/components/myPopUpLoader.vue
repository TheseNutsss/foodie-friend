<template>
     <v-overlay
      v-model="isLoading"
      class="align-center justify-center"
      persistent
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
</template>

<script>
export default {
    name: 'my-loader',
    data(){
      return {
        isLoading: false
      }
    },
    watch: {
      '$store.state.OverlayLoading.isLoading'(){
        this.isLoading = this.$store.state.OverlayLoading.isLoading
      }
    },
}
</script>

<style>

</style>
