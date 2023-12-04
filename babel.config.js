export default {
  // "cacheDirectory": true,
  "presets": [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        "modules": false,
        "targets": {
          "browsers": [
            "> 1%",
            "last 2 versions",
            "not ie <= 8"
          ]
        }
      }
    ],
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}