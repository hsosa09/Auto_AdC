const { test, expect } = require('@playwright/test');
import { baseUrl, variables_userAdmin } from '../variables/variables';
import {realizarLogin, ingresarPanelAdmin, ingresarPanelAdminOpcionesListarProductos, ingresarPanelAdminOpcionesAgregarProductos} from '../variables/testRepetidosAInvocar'

test.describe('Validación de rutas protegidas', () => {
    test.beforeEach(async ({ page }) => {
      // Realiza login antes de cada prueba
      await realizarLogin(page, variables_userAdmin.email, variables_userAdmin.password)
      await ingresarPanelAdmin(page)
    });
  
    test('Panel de administración (/admin)', async ({ page }) => {
      await expect(page.url()).toBe(`${baseUrl}/admin`);

    });
  
    test('Ingresar a Listar Producto', async ({ page }) => {
      await ingresarPanelAdminOpcionesListarProductos(page, 'LISTAR PRODUCTOS');
    });

    test("Ingresar a Agregar Producto", async ({ page }) => {
      await ingresarPanelAdminOpcionesAgregarProductos(page, 'AGREGAR PRODUCTO');
    });
  
    test('Administrar categorías (/admin/administrar-categorias)', async ({ page }) => {
      await page.goto(`${baseUrl}/admin/administrar-categorias`);
      //await expect(page.locator('h1')).toContainText('Administrar Categorías');
    });
  
    test('Administrar características (/admin/administrar-caracteristicas)', async ({ page }) => {
      await page.goto(`${baseUrl}/admin/administrar-caracteristicas`);
      //await expect(page.locator('h1')).toContainText('Administrar Características');
    });
  
    test('Perfil de usuario (/profile)', async ({ page }) => {
      await page.goto(`${baseUrl}/profile`);
      //await expect(page.locator('h1')).toContainText('Perfil de Usuario');
    });
  
    test('Lista de usuarios (/admin/user-list)', async ({ page }) => {
      await page.goto(`${baseUrl}/admin/user-list`);
      //await expect(page.locator('h1')).toContainText('Lista de Usuarios');
    });
  });