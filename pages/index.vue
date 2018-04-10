<template lang="html">
<div>
  <!-- <PanoFrame v-if="show" :timestamp="coords[2].toString()" /> -->
    <PanoFrame v-if="show" />

  <h1 v-else>loading..........</h1>
  <!-- <button @click="getLocation()">Try Again</button> -->
</div>
  <!-- <div id="imagen">

  </div> -->
<!-- </div> -->
</template>

<script>
// if (process.BROWSER_BUILD) {
//   require("aframe");
// }
// require("aframe");

import socket from "~/plugins/socket.js";
// import aframe from "~/plugins/aframe.js";
import PanoFrame from "~/components/PanoFrame";

export default {
  components: {
    PanoFrame
  },
  data() {
    return {
      location: "",
      panoId: "",
      coords: "",
      show: false
    };
  },
  methods: {
    getLocation() {
      let message = "_";
      socket.emit("huey", {
        message
      });
      // var options = {
      //   enableHighAccuracy: true,
      //   timeout: 1000,
      //   maximumAge: 0
      // };
      let vm = this;
      // function showPosition(position) {
      //   console.log("hi!");
      //   console.log(position);
      //   vm.coords = [
      //     position.coords.latitude,
      //     position.coords.longitude,
      //     position.timestamp
      //   ];
      // }

      var options = {
        enableHighAccuracy: false,
        timeout: 60000,
        maximumAge: Infinity
      };

      function success(pos) {
        var crd = pos.coords;
        var time = pos.timestamp;
        vm.coords = [crd.latitude, crd.longitude, time];
        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options);

      // if (navigator.geolocation) {
      //   console.log("dang!");
      //   navigator.geolocation.getCurrentPosition(showPosition);
      // } else {
      //   console.log("Geolocation is not supported by this browser.");
      // }
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
    console.log(this.$axios);

    this.$axios
      .post("/", {
        firstName: "Fred",
        lastName: "Flintstone"
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    this.getLocation();
    let vm = this;
    socket.on("ready", function(data) {
      console.log("data????,ready? " + data);
      setTimeout(x => {
        vm.show = true;
      }, 3000);
    });
  }
};
</script>

<style lang="css">

</style>
