<template>
	<div id="app">
		<router-view/>
	</div>
</template>
<script>
  import enquireScreen from '@/utils/device'

  export default {
    data () {
      return {
      }
    },
    created () {
      let that = this
      enquireScreen(deviceType => {
        // tablet
        if (deviceType === 0) {
          that.$store.commit('TOGGLE_DEVICE', 'mobile')
          that.$store.dispatch('setSidebar', false)
        }
        // mobile
        else if (deviceType === 1) {
          that.$store.commit('TOGGLE_DEVICE', 'mobile')
          that.$store.dispatch('setSidebar', false)
        }
        else {
          that.$store.commit('TOGGLE_DEVICE', 'desktop')
          that.$store.dispatch('setSidebar', true)
        }
      })
    }
  }
</script>
<style>
  #app {
    height: 100%;
  }
</style>
