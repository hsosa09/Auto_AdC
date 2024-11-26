import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Ejecuta tests en archivos en paralelo */
  fullyParallel: true,
  /* Falla la compilación en CI si accidentalmente dejaste test.only en el código fuente. */
  forbidOnly: !!process.env.CI,
  /* Reintenta en CI solamente */
  retries: process.env.CI ? 2 : 0,
  /* No ejecuta tests en paralelo en CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter a utilizar. Ver https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [['github'], ['html']] : 'html',
  /* Configuraciones compartidas para todos los proyectos a continuación. Ver https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* URL base para usar en acciones como `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Recopila traza al reintentar el test fallido. Ver https://playwright.dev/docs/trace-viewer */
    trace: 'on',
  },

  /* Configura proyectos para los navegadores principales */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/

    /* Test contra vistas móviles. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test contra navegadores de marca. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Ejecuta tu servidor de desarrollo local antes de iniciar los tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
