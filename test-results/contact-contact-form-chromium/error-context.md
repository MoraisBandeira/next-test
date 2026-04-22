# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact.spec.ts >> contact form
- Location: e2e/contact.spec.ts:3:5

# Error details

```
Error: expect(locator).not.toBeVisible() failed

Locator:  getByText('Número do WhatsApp')
Expected: not visible
Received: visible
Timeout:  5000ms

Call log:
  - Expect "not toBeVisible" with timeout 5000ms
  - waiting for getByText('Número do WhatsApp')
    9 × locator resolved to <label for="whatsapp" class="text-sm font-medium">Número do WhatsApp</label>
      - unexpected value "visible"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - link "MyApp" [ref=e3] [cursor=pointer]:
      - /url: /
    - list [ref=e4]:
      - listitem [ref=e5]:
        - link "Home" [ref=e6] [cursor=pointer]:
          - /url: /
      - listitem [ref=e7]:
        - link "Table" [ref=e8] [cursor=pointer]:
          - /url: /table
      - listitem [ref=e9]:
        - link "Contact" [ref=e10] [cursor=pointer]:
          - /url: /contact
  - alert [ref=e11]
  - main [ref=e12]:
    - generic [ref=e13]:
      - heading "Contato" [level=1] [ref=e14]
      - paragraph [ref=e15]: Formulário com todos os tipos de campos HTML.
      - generic [ref=e16]:
        - generic [ref=e17]:
          - generic [ref=e18]: Nome
          - textbox "Nome" [ref=e19]:
            - /placeholder: Seu nome
        - generic [ref=e20]:
          - generic [ref=e21]: E-mail
          - textbox "E-mail" [ref=e22]:
            - /placeholder: seu@email.com
            - text: llsdkaçskd
        - generic [ref=e23]:
          - generic [ref=e24]: Senha
          - textbox "Senha" [ref=e25]:
            - /placeholder: ••••••••
            - text: anders
          - generic [ref=e26]: Mínimo de 8 caracteres.
          - generic [ref=e27]: Deve conter pelo menos um número.
          - generic [ref=e28]: Deve conter pelo menos um caractere especial.
        - generic [ref=e29]:
          - generic [ref=e30]: Número (number)
          - spinbutton "Número (number)" [ref=e31]: "65"
        - generic [ref=e32]:
          - generic [ref=e33]: Telefone (tel)
          - textbox "Telefone (tel)" [ref=e34]:
            - /placeholder: +55 (11) 99999-9999
            - text: "98651524"
        - generic [ref=e35]:
          - generic [ref=e36]: Site (url)
          - textbox "Site (url)" [ref=e37]:
            - /placeholder: https://exemplo.com
            - text: google.jp
        - generic [ref=e38]:
          - generic [ref=e39]: Data (date)
          - textbox "Data (date)" [ref=e40]: 2026-04-08
        - generic [ref=e41]:
          - generic [ref=e42]: Intervalo (range)
          - slider "Intervalo (range)" [ref=e43]: "65"
        - generic [ref=e44]:
          - generic [ref=e45]: Arquivo (file)
          - button "Arquivo (file)" [ref=e46]
        - generic [ref=e47]:
          - generic [ref=e48]: switch de campos
          - combobox "switch de campos" [ref=e49]:
            - option "Selecione..."
            - option "campo-1" [selected]
            - option "campo-2"
            - option "campo-3"
        - group "Preferência de contato (radio)" [ref=e50]:
          - generic [ref=e51]: Preferência de contato (radio)
          - generic [ref=e52] [cursor=pointer]:
            - radio "E-mail" [ref=e53]
            - text: E-mail
          - generic [ref=e54] [cursor=pointer]:
            - radio "Telefone" [ref=e55]
            - text: Telefone
          - generic [ref=e56] [cursor=pointer]:
            - radio "WhatsApp" [ref=e57]
            - text: WhatsApp
        - generic [ref=e58]:
          - generic [ref=e59]: Número do WhatsApp
          - textbox "Número do WhatsApp" [ref=e60]:
            - /placeholder: "WhatsApp: (11) 99999-9999"
        - button "Enviar" [ref=e61] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('contact form', async ({ page }) => {
  4  |   await page.goto('http://localhost:3001/');
  5  |   await page.getByRole('link', { name: 'Contact' }).click();
  6  |   await expect(page.getByRole('textbox', { name: 'Nome' })).toBeEmpty();
  7  |   await expect(page.getByText('Nome')).toBeVisible();
  8  |   await expect(page.getByText('E-mail')).toBeVisible();
  9  |   await page.getByRole('textbox', { name: 'E-mail' }).fill('llsdkaçskd');
  10 |   await expect(page.getByText('Senha')).toBeVisible();
  11 |   await expect(page.getByRole('textbox', { name: 'Senha' })).toBeEmpty();
  12 |   await page.getByRole('textbox', { name: 'Senha' }).fill('anders');
  13 |   await expect(page.getByText('Mínimo de 8 caracteres.')).toBeVisible();
  14 |   await expect(page.getByText('Deve conter pelo menos um nú')).toBeVisible();
  15 |   await expect(page.getByText('Deve conter pelo menos um caractere especial.')).toBeVisible();
  16 |   await expect(page.getByText('Número (number)')).toBeVisible();
  17 |   await expect(page.getByRole('spinbutton', { name: 'Número (number)' })).toBeEmpty();
  18 |   await page.getByRole('spinbutton', { name: 'Número (number)' }).fill('65');
  19 |   await expect(page.getByText('Telefone (tel)')).toBeVisible();
  20 |   await expect(page.getByRole('textbox', { name: 'Telefone (tel)' })).toBeEmpty();
  21 |   await page.getByRole('textbox', { name: 'Telefone (tel)' }).fill('98651524');
  22 |   await expect(page.getByText('Site (url)')).toBeVisible();
  23 |   await page.getByRole('textbox', { name: 'Site (url)' }).click();
  24 |   await page.getByRole('textbox', { name: 'Site (url)' }).fill('google.jp');
  25 |   await expect(page.getByText('Data (date)')).toBeVisible();
  26 |   await page.getByRole('textbox', { name: 'Data (date)' }).fill('2026-04-08');
  27 |   await expect(page.getByText('Intervalo (range)')).toBeVisible();
  28 |   await page.getByRole('slider', { name: 'Intervalo (range)' }).fill('65');
  29 |   await page.getByLabel('switch de campos').selectOption('br');
  30 |   await expect(page.getByText('Preferência de contato (radio)')).toBeVisible();
  31 |   await expect(page.getByText('Número do WhatsApp')).not.toBeVisible();
  32 |   await page.getByText('WhatsApp').click();
  33 |   await expect(page.getByText('Número do WhatsApp')).toBeVisible();
  34 |   await page.getByRole('textbox', { name: 'Número do WhatsApp' }).click();
  35 |   await page.getByRole('textbox', { name: 'Número do WhatsApp' }).fill('4');
  36 |   await expect(page.getByText('Apenas letras são permitidas.')).toBeVisible();
  37 |   await page.getByLabel('switch de campos').selectOption('us');
  38 |   await expect(page.getByText('Interesses (checkbox)')).toBeVisible();
  39 |   await page.getByText('Desenvolvimento').click();
  40 |   await page.getByText('Design').click();
  41 |   await page.getByLabel('switch de campos').selectOption('uk');
  42 |   await expect(page.getByText('Mensagem (textarea)')).toBeVisible();
  43 |   await page.getByRole('textbox', { name: 'Mensagem (textarea)' }).click();
  44 |   await page.getByRole('textbox', { name: 'Mensagem (textarea)' }).fill('asdsadsadsadsadsadsadsdsdasdsadsadsadasdasdasdsadasdasdsadsadsadsadasdsadsadsadasdsadasdasdasdasdasdasdasdasdasdsadsadasdasdasdasd');
  45 |   await page.getByLabel('switch de campos').selectOption('br');
  46 |   await expect(page.getByText('Preferência de contato (radio)')).toBeVisible();
> 47 |   await expect(page.getByText('Número do WhatsApp')).not.toBeVisible();
     |                                                          ^ Error: expect(locator).not.toBeVisible() failed
  48 | });
```