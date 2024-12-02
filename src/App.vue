<template>
  <v-overlay
    v-if="overlayStatus"
    persistent
    v-model="overlayStatus"
    style="z-index: 9999"
    class="align-center justify-center"
  >
    <img src="@/assets/images/loading.gif" width="64" v-if="overlayStatus" />
  </v-overlay>
  <v-snackbar
    location="top right"
    v-model="snackData.status"
    :timeout="timeOut"
    :color="snackData.color"
  >
    {{ snackData.message }}</v-snackbar
  >
  <RouterView />
</template>
<script>
import { useBaseStore } from '@/stores/baseStore'
import { mapState } from 'pinia'

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      overlayStatus: false,
      snackData: {
        status: false,
        message: '',
        color: ''
      },
      timeOut: 5000
    }
  },
  computed: {
    ...mapState(useBaseStore, ['overlay', 'snack'])
  },
  watch: {
    snack(val) {
      this.snackData = val
    },
    overlay(val) {
      this.overlayStatus = val
    }
  }
}
</script>


