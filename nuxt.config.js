module.exports = {
  // mode: "spa",
  // router: {
  //   middleware: "panorama"
  // },

  /*
  ** Headers of the page
  */
  head: {
    title: "pkg.name",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "pkg.description" }
    ],
    // script: [
    //   {
    //     src: "https://cdnjs.cloudflare.com/ajax/libs/aframe/0.7.1/aframe.min.js"
    //   }
    // ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#3B8070" },

  /*
  ** Global CSS
  */
  css: ["~/assets/css/tailwind.css"],

  /*
  ** Plugins to load before mounting the App
  */
  // plugins: [{ src: "@/plugins/firebase.js", ssr: false }],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios",
    "~/io"
  ],
  env: {
    WS_URL: process.env.WS_URL || "http://localhost:3000"
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor: ["aframe"],
    extend(config, ctx) {}
  }
};
