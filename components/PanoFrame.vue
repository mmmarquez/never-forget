<template>
  <div class="">
    <a-scene>
      <a-assets>
        <img id="sky" src="/panos/1523336823710_screenshot.png">
      </a-assets>
      <a-sky src="#sky"></a-sky>
    </a-scene>
  </div>
</template>

<script>
if (process.BROWSER_BUILD) {
  require("aframe");
}

export default {
  props: {
    timestamp: String
  },
  mounted() {}
};
</script>


<style>

</style>
