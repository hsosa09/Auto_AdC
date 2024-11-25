import { test, expect } from '@playwright/test';
import { variables_registro } from '../variables/variables';
import {inicio, productosNavbar, sitioWip, ingresarLogin, ingresarRegistro, realizarRegistro} from '../variables/testRepetidosAInvocar';


// Validación de rutas públicas sin loguearse
test.describe('Validación de rutas públicas sin loguear', () => {
  test('No logueado - Página de inicio (/)', async ({ page }) => {
    await inicio(page);
  });

  test('No logueado - Página de registro (/register)', async ({ page }) => {
    await ingresarRegistro(page);
  });

  test('No logueado - Página de registro Registrarse (/register)', async ({ page }) => {
    await realizarRegistro(page, variables_registro.nombre, variables_registro.apellido, variables_registro.email, variables_registro.password);
  });

  test('No logueado - Página de inicio de sesión (/login)', async ({ page }) => {
    await ingresarLogin(page)
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