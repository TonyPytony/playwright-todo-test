import { test } from '../fixtures';
import {todos} from "../../data/todoData";

test.describe('TodoMVC @ui', () => {
    test('should add, complete, uncompleted, delete and validate todos @smoke', async ({todoPage}) => {

        await test.step('Add todos', async () => {
        await todoPage.addTodos(todos.learn, todos.write, todos.run);
        await todoPage.expectTodos([todos.learn, todos.write, todos.run]);
        await todoPage.expectTodosCount(3);

            //додаємо скріншот у Allure
            await test.info().attach('Todos after adding',{
                body: await todoPage.page.screenshot(),
                contentType: 'image/png',
            });
            });

        await test.step('Complete first todo and check', async () => {
            await todoPage.completeTodo(0);
            await todoPage.expectTodosCompleted([0]);
        });

        await test.step('Uncompleted first todo and check', async () => {
        await todoPage.uncompletedTodo(0);
        await todoPage.expectTodosNotCompleted([0, 1, 2]);
        });

        await test.step('Delete last todo and check', async () => {
        await todoPage.deleteTodo(2);
        await todoPage.expectTodosCount(2);
        await todoPage.expectTodoNotExists(todos.run);
    });

        await test.info().attach('Todos after deleting',{
            body: await todoPage.page.screenshot(),
            contentType: 'image/png',
        });
    });

    //Параметризація: проганяємо один і той самий тест з різними даними
    const todoItems = [todos.learn, todos.write, todos.run];
    for (const item of todoItems) {
        test(`@regression should add a single todo: ${item}`, async ({todoPage}) => {
            await todoPage.addTodo(item);
            await todoPage.expectTodos([item]);
            await todoPage.expectTodosCount(1);
        });
    }
});
