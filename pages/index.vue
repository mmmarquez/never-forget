<template lang="html">
  <div class="">
    <!-- <a-scene>
      <a-assets>
        <img id="sky" src="sky.jpg">
      </a-assets>
      <a-sky src="#sky"></a-sky>
    </a-scene>
  </div> -->
  <div id="imagen">

  </div>
</div>
</template>

<script>
if (process.BROWSER_BUILD) {
  require("aframe");
}
import socket from "~/plugins/socket.js";

export default {
  data() {
    return {
      location: "",
      panoId: "",
      coords: ""
    };
  },
  methods: {
    getLocation() {
      let vm = this;
      function showPosition(position) {
        console.log(position);
        vm.coords = [
          position.coords.latitude,
          position.coords.longitude,
          position.timestamp
        ];
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
  },
  watch: {
    coords: function(val) {
      let message = this.coords;
      socket.emit("last-messages", {
        message
      });
    }
  },
  mounted() {
    console.log("lolololol");
    this.getLocation();
  }
};
</script>

<style lang="css">

</style>
