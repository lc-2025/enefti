import { defineConfig } from 'cypress';
import { FRONTEND_URL } from '@/utilities/environment';

// Cypress Configuration
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: FRONTEND_URL,
  },
});
