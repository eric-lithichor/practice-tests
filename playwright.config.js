import { defineConfig } from '@playwright/test';

export default defineConfig({
    reporter: 'list',
    timeout: 60000,
    use: {
        headless: false,
        actionTimeout: 10000
      },
})