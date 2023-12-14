export default {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": ["last 2 versions", "not ie <= 10"]
        }
      }
    ],
    '@babel/preset-react'
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3,
      }
    ]
  ]
}