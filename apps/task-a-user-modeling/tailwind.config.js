const sharedConfig = require("../../packages/config/tailwind.config.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  content: [
    // Include shared config content files
    ...sharedConfig.content,
    // Add app specific content files
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};