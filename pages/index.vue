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

// var googleMapsClient = require("@google/maps").createClient({
//   key: "your API key here"
// });
// const panorama = require("google-panorama-by-location/node.js");

export default {
  data() {
    return {
      location: "",
      panoId: ""
    };
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        // navigator.geolocation.getCurrentPosition(getCoords());
        let vm = this;
        // this.getPano(position.coords.latitude, position.coords.longitude);

        navigator.geolocation.getCurrentPosition(function(position) {
          console.log("lol", position.coords);
        });
        console.log("h");
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    getPano(lat, long) {
      // 39.309792
      //
      panorama(["39.309792", "-76.6293732"], (err, result) => {
        if (err) throw err;
        this.panoId = result.id;
      });
    }
  },
  created() {},
  mounted() {
    var load = require("google-panorama-equirectangular");
    var panoID = "dXZfBMex9_L7jO2JW3FTdA";

    this.getLocation();
    // this.getPano();

    setTimeout(x => {
      if (panoID) {
        load(panoID, { zoom: 2 })
          .on("start", function(data) {
            console.log("canvas size: ", data.width, data.height);
          })
          .on("progress", function(ev) {
            console.log("progress: ", ev.count / ev.total);
          })
          .on("complete", function(image) {
            var imagen = document.getElementById("imagen");
            imagen.appendChild(image);
            console.log("canvas image: ", image);
          });
      }
    }, 3000);
  }
};
</script>

<style lang="css">

</style>
