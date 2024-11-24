import { test, expect } from '@playwright/test';
import { baseUrl, variables_userComun } from '../variables/variables';
import {productosNavbar, sitioWip} from '../variables/testRepetidosAInvocar'


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
    await productosNavbar(page, "CATÁLOGO", "Vajilla");
  });

  test('No logueado - Lista de productos Cubiertos (/listaProductos/2)', async ({ page }) => {
    await productosNavbar(page, "CATÁLOGO", "Cubiertos");
  });

  test('No logueado - Lista de productos Cristalería (/listaProductos/3)', async ({ page }) => {
    await productosNavbar(page, "CATÁLOGO", "Cristalería");
  });


  //Tematicas
  test('No logueado - Tematicas Halloween (/detail)', async ({ page }) => {
    await productosNavbar(page, "TEMÁTICAS", "Halloween");
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