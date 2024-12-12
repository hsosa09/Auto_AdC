import { expect } from '@playwright/test';
import { baseUrl, variables_userComun } from './variables';


// Función para navegar y validar títulos de páginas
export async function validarRuta(page, ruta, textoValidar, selector = 'h1') {
  await page.goto(`${baseUrl}${ruta}`);
  await expect(page.getByText('Tus recuerdos en porcelana')).toBeVisible();
  if (textoValidar) {
    await expect(page.locator(selector)).toContainText(textoValidar);
  }
}

// Ingresar al sitio y ver si los botones de navbar son visibles
export async function inicio(page) {
  await page.goto(baseUrl);
  await expect(page.getByText('Tus recuerdos en porcelana')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Catálogo' })).toBeVisible();
  //await expect(page.getByRole('button', { name: 'Temáticas' })).toBeVisible();
  //await expect(page.getByRole('button', { name: 'Premium set' })).toBeVisible();
  //await expect(page.getByRole('button', { name: 'Contáctanos' })).toBeVisible();

};

// Ingresar a Catalogo o lleva a wip
export async function productosNavbar(page, tipo, opcion) {
  try {
  await inicio(page);
  await page.getByRole('button', { name: tipo }).click();
  await expect(page.getByRole('link', { name: opcion })).toBeVisible();
  await page.getByRole('link', { name: opcion }).click();
  await expect(page.getByRole('heading', { name: opcion })).toBeVisible();
  } 
  catch (error) {
    await sitioWip(page);
  }
};

// Ingresa a Premium Set o lleva a wip
export async function productosNavbarPremiumSet(page, tipo) {
  try {
  await inicio(page);
  await page.getByRole('button', { name: tipo }).click();
  await expect(page.getByRole('link', { name: tipo })).toBeVisible();
  } 
  catch (error) {
    await sitioWip(page);
  }
};

// Lleva a sitio wip y muestra imagen de mantenimiento en local u online
export async function sitioWip(page){
  try {
    await expect(page.locator('img[alt="mantenimiento"]')).toHaveAttribute('src', '/assets/sitioenmantenimiento-DhxBcCgZ.jpg');
  } catch (error) {
    await expect(page.locator('img[alt="mantenimiento"]')).toHaveAttribute('src', '/public/images/sitioenmantenimiento.jpg');
  }
}

// Función para realizar el login
export async function ingresarLogin(page){
  await page.goto(baseUrl);
  await expect(page.getByText('Tus recuerdos en porcelana')).toBeVisible();
  await page.getByRole('banner').getByRole('button').nth(1).click();
  await page.getByRole('link', { name: 'Iniciar Sesión' }).click();
  await expect(page.locator('#root')).toContainText('Iniciar Sesión');
}

export async function realizarLogin(page, email, password) {
  await ingresarLogin(page);
  await expect(page.getByLabel('Email *')).toBeVisible();
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill(email);
  await expect(page.getByLabel('Contraseña *')).toBeVisible();
  await page.getByLabel('Contraseña *').click();
  await page.getByLabel('Contraseña *').fill(password);
  //await expect(page.getByRole('button', { name: '¿Olvidaste tu contraseña?' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ingresar' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Registrarse' })).toBeVisible();
  await page.getByRole('button', { name: 'Ingresar' }).click();
  try {
    await expect(page.getByText('¡Login exitoso!')).toBeVisible();
    await expect(page.getByText('Bienvenido de nuevo')).toBeVisible();
    await page.getByRole('button', { name: 'OK' }).click(); 
    await expect(page.url()).toBe(`${baseUrl}/`);
  } catch (error) {
    await expect(page.getByText('Las credenciales no son válidas')).toBeVisible();
    await expect(page.getByRole('button', { name: 'OK' })).toBeVisible();
    await page.getByRole('button', { name: 'OK' }).click();
  }
  
  
}




// Función para realizar el registro
export async function ingresarRegistro(page){
  await page.goto(baseUrl);
  await expect(page.getByText('Tus recuerdos en porcelana')).toBeVisible();
  await page.getByRole('banner').getByRole('button').nth(1).click();
  await page.getByRole('link', { name: 'Regístrate' }).click();
  await expect(page.getByRole('heading', { name: 'Crear cuenta 📋' })).toBeVisible();
  await expect(page.getByText('Vamos a comenzar a configurar')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Datos de registro de usuario' })).toBeVisible();
  await expect(page.getByPlaceholder('Nombre')).toBeVisible();
  await expect(page.getByPlaceholder('Apellido')).toBeVisible();
  await expect(page.getByPlaceholder('Email')).toBeVisible();
  await expect(page.getByPlaceholder('Contraseña')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Registrarse' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cancelar' })).toBeVisible();
}

// Registrarse
export async function realizarRegistro(page, nombre, apellido, email, password, esNuevo) {
  await ingresarRegistro(page);
  await page.getByPlaceholder('Nombre').click();
  await page.getByPlaceholder('Nombre').fill(nombre);
  await page.getByPlaceholder('Apellido').click();
  await page.getByPlaceholder('Apellido').fill(apellido);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Contraseña').click();
  await page.getByPlaceholder('Contraseña').fill(password);
  await page.getByRole('button', { name: 'Registrarse' }).click();
  if (esNuevo) {
    await expect(page.getByText('Usuario creado')).toBeVisible();
    await expect(page.getByRole('button', { name: 'OK' })).toBeVisible();
    await page.getByRole('button', { name: 'OK' }).click();
  } else {
    await expect(page.getByText('El usuario ya existe.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'OK' })).toBeVisible();
    await page.getByRole('button', { name: 'OK' }).click();
  }
}



// Ingresar a panel admin
export async function ingresarPanelAdmin(page){
  await page.goto(baseUrl);
  await expect(page.getByText('Tus recuerdos en porcelana')).toBeVisible();
  await page.getByRole('banner').getByRole('button').nth(1).click();
  await page.getByRole('link', { name: 'Panel Admin' }).click();
  await expect(page.locator('#root')).toContainText('Panel de Administración');
  await expect(page.getByRole('button', { name: 'LISTAR PRODUCTOS' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'AGREGAR PRODUCTO' })).toBeVisible();
  // await expect(page.getByRole('button', { name: 'ADMINISTRAR CARACTERISTICAS' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'ADMINISTRAR USUARIOS' })).toBeVisible();

}

// Ingresar a panel admin Listar Productos
export async function ingresarPanelAdminOpcionesListarProductos(page, tipo) {
  await page.getByRole('button', { name: tipo }).click();
  await expect(page.getByRole('columnheader', { name: 'Nombre ▲' })).toBeVisible();
  await page.waitForSelector('.rdt_TableRow');

  const tabla = page.locator('[role="table"]');
  await expect(tabla).toBeVisible();

  const filas = tabla.locator('.rdt_TableRow');
  let numeroDeFilas = await filas.count();
  expect(numeroDeFilas).toBeGreaterThan(0);
  console.log(`Número inicial de filas: ${numeroDeFilas}`);

  // Cantidad de resultados por página
  const rowsPerPageSelect = page.locator('select[aria-label="Rows per page:"]');
  await expect(rowsPerPageSelect).toBeVisible();

  // Cambiamos a 10 filas por página
  await rowsPerPageSelect.selectOption('10');
  // Espera a que actualice
  await page.waitForSelector('.rdt_TableRow');
  numeroDeFilas = await filas.count();
  console.log(`Número de filas después de seleccionar 10: ${numeroDeFilas}`);
  expect(numeroDeFilas).toBeLessThanOrEqual(10);

  const nextPageButton = page.getByRole('button', { name: 'Next Page' });
  await expect(nextPageButton).toBeVisible();
  await expect(nextPageButton).toBeEnabled();
  await nextPageButton.click();

  // Espera a que actualice
  await page.waitForSelector('.rdt_TableRow');
  numeroDeFilas = await filas.count();
  console.log(`Número de filas en la página siguiente: ${numeroDeFilas}`);
  expect(numeroDeFilas).toBeLessThanOrEqual(10);

  // Ir a la última página de resultados
  const lastPageButton = page.getByRole('button', { name: 'Last Page' });
  await expect(lastPageButton).toBeEnabled();
  await lastPageButton.click();

  // Espera a que actualice
  await page.waitForSelector('.rdt_TableRow');

  // Contamos las filas de la última página
  numeroDeFilas = await filas.count();
  console.log(`Número de filas en la última página: ${numeroDeFilas}`);
  expect(numeroDeFilas).toBeGreaterThanOrEqual(1);

  await rowsPerPageSelect.selectOption('5');
  await page.waitForSelector('.rdt_TableRow');
  numeroDeFilas = await filas.count();
  console.log(`Número de filas después de volver a seleccionar 5: ${numeroDeFilas}`);
  expect(numeroDeFilas).toBeLessThanOrEqual(5);
}



// Ingresar a panel admin Agregar Productos
export async function ingresarPanelAdminOpcionesAgregarProductos(page, tipo) {
  await page.getByRole('button', { name: tipo }).click();
  await expect(page.getByRole('button', { name: 'Volver' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Agregar Producto' })).toBeVisible();
  await expect(page.getByText('Nombre:')).toBeVisible();
  await expect(page.locator('input[name="nombre"]')).toBeVisible();
  await expect(page.getByText('Descripción')).toBeVisible();
  await expect(page.locator('textarea[name="descripcion"]')).toBeVisible();
  await expect(page.getByText('Precio')).toBeVisible();
  await expect(page.locator('div').getByRole('spinbutton')).toBeVisible();
  //await expect(page.getByText('Inventario *')).toBeVisible();
  //await expect(page.locator('div').filter({ hasText: /^Inventario \*$/ }).getByRole('spinbutton')).toBeVisible();
  await expect(page.getByText('Categoría:')).toBeVisible();
  await expect(page.locator('select[name="categoria_id"]')).toBeVisible();
  await expect(page.getByText('Temática:')).toBeVisible();
  await expect(page.locator('select[name="tematica_id"]')).toBeVisible();
  await expect(page.getByText('Imágenes (URLs):')).toBeVisible();
  await expect(page.getByPlaceholder('Por favor, ingresa las 5 URLs')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Agregar Imagen' })).toBeVisible();
  await expect(page.getByText('Agregar Característica:')).toBeVisible();
  await expect(page.getByRole('combobox').nth(2)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Registrar Producto' })).toBeVisible();
  // pendiente logica añadir producto
};


export async function ingresarPanelAdminOpcionesAgregarProducto(page, tipo){

  await page.getByRole('button', { name: 'ADMINISTRAR CARACTERISTICAS' }).click();
  await expect(page.getByRole('heading', { name: 'LISTAR CARACTERISTICAS' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'AGREGAR CARACTERISTICA' })).toBeVisible();
};