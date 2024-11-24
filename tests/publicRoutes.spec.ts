// tests/publicRoutes.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Validación de rutas públicas', () => {
  const baseUrl = 'https://aura-de-cristal.vercel.app';

  test('Página de inicio (/)', async ({ page }) => {
    await page.goto(`${baseUrl}/`);
    await expect(page).toHaveTitle(/Home/);
  });

  test('Lista de productos (/listaProductos/:id)', async ({ page }) => {
    await page.goto(`${baseUrl}/listaProductos/1`);
    // Agrega las validaciones necesarias
    await expect(page.locator('h1')).toContainText('Productos');
  });

  test('Detalle de producto (/detail/:id)', async ({ page }) => {
    await page.goto(`${baseUrl}/detail/1`);
    // Agrega las validaciones necesarias
    await expect(page.locator('h1')).toContainText('Detalle del Producto');
  });

  test('Galería de imágenes (/gallery/:id)', async ({ page }) => {
    await page.goto(`${baseUrl}/gallery/1`);
    // Agrega las validaciones necesarias
    await expect(page.locator('.gallery')).toBeVisible();
  });

  test('Página de registro (/register)', async ({ page }) => {
    await page.goto(`${baseUrl}/register`);
    await expect(page.locator('form#registerForm')).toBeVisible();
  });

  test('Página de inicio de sesión (/login)', async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await expect(page.locator('form#loginForm')).toBeVisible();
  });

  test('Página en construcción (/wip)', async ({ page }) => {
    await page.goto(`${baseUrl}/wip`);
    await expect(page.locator('h1')).toContainText('En Construcción');
  });

  test('Página 404 (*)', async ({ page }) => {
    await page.goto(`${baseUrl}/ruta-inexistente`);
    await expect(page.locator('h1')).toContainText('404');
  });
});
