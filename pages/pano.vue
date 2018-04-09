<template>
  <div>
    <div id="imagen">

    </div>
  </div>
</template>

<script>
var load = require("google-panorama-equirectangular");
const panorama = require("google-panorama-by-location/node.js");

export default {
  async asyncData({ route }) {
    console.log(route.query.coords);
    let params = route.query.coords;
    let coords = params.split(",");
    console.log(coords);
    let data = { lat: coords[0], long: coords[1] };
    return data;
  },
  data() {
    return {
      data: ""
    };
  },
  methods: {
    getPano() {
      panorama([this.lat, this.long], (err, result) => {
        if (err) throw err;
        if (result.id) {
          load(result.id, { zoom: 2 })
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
      });
    }
  },
  mounted() {
    this.getPano();
  }
};
</script>