import { test as base} from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

// Розширюємо базовий тест
export const test = base.extend<{
    todoPage: TodoPage;
}>({
    todoPage: async ({ page }, use) => {
        const todoPage = new TodoPage(page);
        await todoPage.goto();
        await use(todoPage);
    },
});
