// tests/protectedRoutes.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Validación de rutas protegidas', () => {
  const baseUrl = 'https://aura-de-cristal.vercel.app';

  test.beforeEach(async ({ page }) => {
    // Navegar a la página de inicio de sesión
    await page.goto(`${baseUrl}/login`);

    // Completar el formulario de inicio de sesión
    await page.fill('input[name="email"]', 'tu_correo@example.com');
    await page.fill('input[name="password"]', 'tu_contraseña');

    // Enviar el formulario
    await page.click('button[type="submit"]');

    // Esperar a que la navegación termine
    await page.waitForNavigation();
  });

  test('Panel de administración (/admin)', async ({ page }) => {
    await page.goto(`${baseUrl}/admin`);
    await expect(page.locator('h1')).toContainText('Administrador');
  });

  test('Agregar producto (/admin/agregarProducto)', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/agregarProducto`);
    await expect(page.locator('form#agregarProductoForm')).toBeVisible();
  });

  test('Administrar categorías (/admin/administrar-categorias)', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/administrar-categorias`);
    await expect(page.locator('h1')).toContainText('Administrar Categorías');
  });

  test('Administrar características (/admin/administrar-caracteristicas)', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/administrar-caracteristicas`);
    await expect(page.locator('h1')).toContainText('Administrar Características');
  });

  test('Perfil de usuario (/profile)', async ({ page }) => {
    await page.goto(`${baseUrl}/profile`);
    await expect(page.locator('h1')).toContainText('Perfil de Usuario');
  });

  test('Lista de usuarios (/admin/user-list)', async ({ page }) => {
    await page.goto(`${baseUrl}/admin/user-list`);
    await expect(page.locator('h1')).toContainText('Lista de Usuarios');
  });
});
