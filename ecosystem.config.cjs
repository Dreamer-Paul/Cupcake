module.exports = {
  apps: [
    {
      name: "cupcake",
      script: "pnpm",
      args: "start",
      cwd: __dirname,
      interpreter: "none",
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
