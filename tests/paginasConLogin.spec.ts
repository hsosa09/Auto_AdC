import { test, expect } from '@playwright/test';
import { variables_registro_existente } from '../variables/variables';
import {inicio, productosNavbar, productosNavbarPremiumSet, realizarLogin} from '../variables/testRepetidosAInvocar';

// Validación de rutas públicas estando logueado
test.describe('Validación de rutas públicas estando logueado', () => {
  test.beforeEach(async ({ page }) => {
    await realizarLogin(page, variables_registro_existente.email, variables_registro_existente.password)
  });
  test('No logueado - Página de inicio (/)', async ({ page }) => {
    await inicio(page);
  });

  // Catalogo
  test('Logueado - Lista de productos Vajillas (/listaProductos/1)', async ({ page }) => {
    await productosNavbar(page, "CATÁLOGO", "Vajilla");
  });

  test('Logueado - Lista de productos Cubiertos (/listaProductos/2)', async ({ page }) => {
    await productosNavbar(page, "CATÁLOGO", "Cubiertos");
  });

  test('Logueado - Lista de productos Cristalería (/listaProductos/3)', async ({ page }) => {
    await productosNavbar(page, "CATÁLOGO", "Cristalería");
  });


  //Tematicas
  test('Logueado - Tematicas Halloween', async ({ page }) => {
    await productosNavbar(page, "TEMÁTICAS", "Halloween");
  });

  test('Logueado - Tematicas Navidad', async ({ page }) => {
    await productosNavbar(page, "TEMÁTICAS", "Navidad");
  });

  test('Logueado - Tematicas Acción de Gracias', async ({ page }) => {
    await productosNavbar(page, "TEMÁTICAS", "Acción de Gracias");
  });


  //Premium Set
  test('Logueado - Premium Set', async ({ page }) => {
    await productosNavbarPremiumSet(page, "Premium Set")
  });
}); 