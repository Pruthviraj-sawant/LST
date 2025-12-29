module.exports = {
  apps: [
    {
      name: "api-3001",
      script: "server.js",
      env: {
        PORT: 3001
      }
    },
    {
      name: "api-3002",
      script: "server.js",
      env: {
        PORT: 3002
      }
    },
    {
      name: "api-3003",
      script: "server.js",
      env: {
        PORT: 3003
      }
    }
  ]
};
