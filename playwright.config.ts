import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',           // папка з тестами
    fullyParallel: true,           // запуск тестів у різних файлах паралельно
    forbidOnly: !!process.env.CI,  // помилка, якщо залишили test.only на CI
    retries: process.env.CI ? 2 : 0, // повтори на CI
    workers: process.env.CI ? 1 : undefined, // кількість потоків
    reporter: [
        ['html', { open: 'never' }],  // HTML звіт
        ['list'],                      // консольний
        ['junit', { outputFile: 'results.xml' }],
        ['json', { outputFile: 'results.json' }],
        ['allure-playwright', { outputFolder: 'allure-results' }]
    ],
    use: {
        headless: true,              // бачимо браузер
        baseURL: 'https://demo.playwright.dev/todomvc/', // базовий URL для page.goto('/')
        trace: 'retain-on-failure',   // трейс при падінні
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] },
        // },
        // {
        //     name: 'webkit',
        //     use: { ...devices['Desktop Safari'] },
        // },
    ],
});
