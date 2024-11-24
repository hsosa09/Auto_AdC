import { test, expect } from '@playwright/test';
import { variables_userComun } from '../variables/variables';
import {listaProductos} from '../variables/testRepetidosAInvocar'

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
  
  