module.exports = {
  apps: [
    {
      name: "cupcake",
      script: "./node_modules/@react-router/serve/bin.js",
      args: "./build/server/index.js",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
