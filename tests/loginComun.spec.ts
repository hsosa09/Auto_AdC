import { test, expect } from '@playwright/test';
import { variables_userComun } from '../variables/variables';
import {listaProductos} from '../variables/testRepetidosAInvocar';




// Función para realizar el login
async function realizarLogin(page) {
  await page.goto(baseUrl);
  await expect(page.getByText('Tus recuerdos en porcelana')).toBeVisible();
  await page.getByRole('banner').getByRole('button').nth(4).click();
  await page.getByRole('link', { name: 'Iniciar Sesión' }).click();
  await expect(page.locator('#root')).toContainText('Iniciar Sesión');
  await expect(page.getByLabel('Email *')).toBeVisible();
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill(variables_userComun.email);
  await expect(page.getByLabel('Contraseña *')).toBeVisible();
  await page.getByLabel('Contraseña *').click();
  await page.getByLabel('Contraseña *').fill(variables_userComun.password);
  await expect(page.getByRole('button', { name: '¿Olvidaste tu contraseña?' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ingresar' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Registrarse' })).toBeVisible();
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await page.getByRole('button', { name: 'OK' }).click(); 
}

// Validación de rutas públicas sin loguearse
test.describe('Validación de rutas públicas sin loguear', () => {
  test('No logueado - Página de inicio (/)', async ({ page }) => {
    await validarRuta(page, '/', null); // No requiere validación específica
  });

  test('No logueado - Página de registro (/register)', async ({ page }) => {
    await validarRuta(page, '/register', 'Crear cuenta 📋', 'h1');
  });

  test('No logueado - Página de inicio de sesión (/login)', async ({ page }) => {
    await validarRuta(page, '/login', 'Iniciar Sesión', '#root');
  });

  // Catalogo
  test('No logueado - Lista de productos Vajillas (/listaProductos/1)', async ({ page }) => {
    await listaProductos(page, "CATÁLOGO", "Vajilla");
  });

  test('No logueado - Lista de productos Cubiertos (/listaProductos/2)', async ({ page }) => {
    await listaProductos(page, "CATÁLOGO", "Cubiertos");
  });

  test('No logueado - Lista de productos Cristalería (/listaProductos/3)', async ({ page }) => {
    await listaProductos(page, "CATÁLOGO", "Cristalería");
  });

  test('No logueado - Detalle de producto (/detail)', async ({ page }) => {
    await validarRuta(page, '/detail', null); // Agrega texto a validar si aplica
  });

  test('No logueado - Galería de imágenes (/gallery)', async ({ page }) => {
    await validarRuta(page, '/gallery', null); // Agrega texto o elemento si aplica
  });

  test('No logueado - Página en construcción (/wip)', async ({ page }) => {
    await page.goto(`${baseUrl}/wip`);
    await expect(page.locator('img[alt="mantenimiento"]')).toHaveAttribute('src', '/assets/sitioenmantenimiento-DhxBcCgZ.jpg');  
  });

  test('No logueado - Página 404 (*)', async ({ page }) => {
    await page.goto(`${baseUrl}/ruta-inexistente`);
    await expect(page.locator('span[class="error-code"]')).toContainText('404: NOT_FOUND');
  });
}); // Cierre de test.describe para rutas públicas sin loguear

// Validación de rutas públicas estando logueado
test.describe('Validación de rutas públicas estando logueado', () => {
  test.beforeEach(async ({ page }) => {
    await realizarLogin(page);
  });

  test('Logueado - Página de inicio (/)', async ({ page }) => {
    await validarRuta(page, '/', null); // No requiere validación específica
  });

  test('Logueado - Lista de productos Vajilla (/listaProductos/1)', async ({ page }) => {
    await validarRuta(page, '/listaProductos', 'Productos', 'h1');
  });

  test('Logueado - Detalle de producto (/detail)', async ({ page }) => {
    await validarRuta(page, '/detail', 'Detalle del Producto', 'h1');
  });

  test('Logueado - Galería de imágenes (/gallery)', async ({ page }) => {
    await validarRuta(page, '/gallery', null, '.gallery');
  });

  test('Logueado - Página en construcción (/wip)', async ({ page }) => {
    await page.goto(`${baseUrl}/wip`);
    await expect(page.locator('img[alt="mantenimiento"]')).toHaveAttribute('src', '/assets/sitioenmantenimiento-DhxBcCgZ.jpg');  
  });

  test('Logueado - Página 404 (*)', async ({ page }) => {
    await page.goto(`${baseUrl}/ruta-inexistente`);
    await expect(page.locator('span[class="error-code"]')).toContainText('404: NOT_FOUND');
  });
});









test('test23214', async ({ page }) => {
  await page.goto('http://localhost:4000/');
  await expect(page.getByText('Tus recuerdos en porcelana')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Catálogo' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Temáticas' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Premium set' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Contáctanos' })).toBeVisible();
  await page.getByRole('button', { name: 'Catálogo' }).click();
  await expect(page.getByRole('link', { name: 'Vajilla' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Cubiertos' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Cristalería' })).toBeVisible();
  await page.getByRole('link', { name: 'Vajilla' }).click();
  await expect(page.getByRole('heading', { name: 'Vajillas' })).toBeVisible();
});