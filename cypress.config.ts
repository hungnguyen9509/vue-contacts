import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:5173/",
    watchForFileChanges: false,
  },
  env: {
    email: "test@gmail.com",
    password: "welcomex@X",
  },
});
