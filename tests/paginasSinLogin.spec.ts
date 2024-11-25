import { test, expect } from '@playwright/test';
import { variables_registro_existente, variables_registro_nuevo } from '../variables/variables';
import {inicio, productosNavbar, ingresarLogin, ingresarRegistro, realizarRegistro, productosNavbarPremiumSet, realizarLogin} from '../variables/testRepetidosAInvocar';


// Validación de rutas públicas sin loguearse
test.describe('Validación de rutas públicas sin loguear', () => {
  test('No logueado - Página de inicio (/)', async ({ page }) => {
    await inicio(page);
  });

  test('No logueado - Página de registro (/register)', async ({ page }) => {
    await ingresarRegistro(page);
  });

  test('No logueado - Página de registro Registrarse usuario existente (/register)', async ({ page }) => {
    await realizarRegistro(page, variables_registro_existente.nombre, variables_registro_existente.apellido, variables_registro_existente.email, variables_registro_existente.password, false);
  });

  test('No logueado - Página de registro Registrarse usuario nuevo (/register)', async ({ page }) => {
    await realizarRegistro(page, variables_registro_nuevo.nombre, variables_registro_nuevo.apellido, variables_registro_nuevo.email, variables_registro_nuevo.password, true);
  });

  test('No logueado - Página de inicio de sesión (/login)', async ({ page }) => {
    await ingresarLogin(page)
  });

  test('No logueado - Página de inicio de sesión Loguearse (/login)', async ({ page }) => {
    await realizarLogin(page, variables_registro_existente.email, variables_registro_existente.password)
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
  test('No logueado - Tematicas Halloween', async ({ page }) => {
    await productosNavbar(page, "TEMÁTICAS", "Halloween");
  });

  test('No logueado - Tematicas Navidad', async ({ page }) => {
    await productosNavbar(page, "TEMÁTICAS", "Navidad");
  });

  test('No logueado - Tematicas Acción de Gracias', async ({ page }) => {
    await productosNavbar(page, "TEMÁTICAS", "Acción de Gracias");
  });

  //Premium Set
  test('No logueado - Premium Set', async ({ page }) => {
    await productosNavbarPremiumSet(page, "Premium Set")
  });
}); 