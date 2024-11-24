import { test, expect } from '@playwright/test';
import { variables_userComun } from '../variables/variables';

export const variables_userAdmin = {
    emailAdmin: 'aasa1ad111111@asd.asd',
    passwordAdmin: '123456Aa!',
    };

test('loginComunDatosCorrectos', async ({ page }) => {
  await page.goto('https://aura-de-cristal.vercel.app/');
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
});


test('loginAdminDatosCorrectos', async ({ page }) => {
  await page.goto('https://aura-de-cristal.vercel.app/');
  await expect(page.getByText('Tus recuerdos en porcelana')).toBeVisible();
  await page.getByRole('banner').getByRole('button').nth(4).click();
  await page.getByRole('link', { name: 'Iniciar Sesión' }).click();
  await expect(page.locator('#root')).toContainText('Iniciar Sesión');
  await expect(page.getByLabel('Email *')).toBeVisible();
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill(variables_userAdmin.emailAdmin);
  await expect(page.getByLabel('Contraseña *')).toBeVisible();
  await page.getByLabel('Contraseña *').click();
  await page.getByLabel('Contraseña *').fill(variables_userAdmin.passwordAdmin);
  await expect(page.getByRole('button', { name: '¿Olvidaste tu contraseña?' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ingresar' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Registrarse' })).toBeVisible();
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  });