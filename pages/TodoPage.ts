import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
    readonly page: Page;
    readonly newTodoInput: Locator;
    readonly todoList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newTodoInput = page.locator('.new-todo');
        this.todoList = page.locator('.todo-list li');
    }

    async goto() {
        await this.page.goto('#/');
    }

    async addTodo(todoText: string) {
        await this.newTodoInput.fill(todoText);
        await this.newTodoInput.press('Enter');
    }

    async addTodos(...items: string[]) {
        for (const item of items) {
            await this.addTodo(item);
        }
    }

    async completeTodo(index: number) {
        const checkbox = this.todoList.nth(index).locator('.toggle');
        await checkbox.check();
    }

    async uncompletedTodo(index: number) {
        const checkbox = this.todoList.nth(index).locator('.toggle');
        await checkbox.uncheck();
    }

    async deleteTodo(index: number) {
        const todoItem = this.todoList.nth(index);
        await todoItem.hover();
        await todoItem.locator('.destroy').click();
    }

    //Очікування
    async expectTodosNotCompleted(indexes: number[]) {
        for (const index of indexes) {
            const checkbox = this.todoList.nth(index).locator('.toggle');
            await expect(checkbox).not.toBeChecked();
        }
    }

    async expectTodosCompleted(indexes: number[]) {
        for (const index of indexes) {
            const checkbox = this.todoList.nth(index).locator('.toggle');
            await expect(checkbox).toBeChecked();
        }
    }

    async expectTodosCount(count: number) {
        await expect(this.todoList).toHaveCount(count);
    }

    async expectTodos(expectedTodos: string[]) {
        await expect(this.todoList).toHaveText(expectedTodos);
    }

    async expectTodoNotExists(text: string) {
        const filtered = this.todoList.filter({ hasText: text });
        await expect(filtered).toHaveCount(0);
    }
}
