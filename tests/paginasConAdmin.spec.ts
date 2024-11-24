const { test, expect } = require('@playwright/test');
import { baseUrl, variables_userAdmin } from '../variables/variables';
import {loginAdminDatosCorrectos} from '../variables/testRepetidosAInvocar'

test.describe('Validación de rutas protegidas', () => {
    test.beforeEach(async ({ page }) => {
      // Realiza login antes de cada prueba
      await loginAdminDatosCorrectos(page, variables_userAdmin.emailAdmin, variables_userAdmin.passwordAdmin);
    });
  
    test('Panel de administración (/admin)', async ({ page }) => {
      await page.goto(`${baseUrl}/admin`);
      // await expect(page.locator('h1')).toContainText('Administrador');
    });
  
    test('Agregar producto (/admin/agregarProducto)', async ({ page }) => {
      await page.goto(`${baseUrl}/admin/agregarProducto`);
      // await expect(page.locator('form#agregarProductoForm')).toBeVisible();
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