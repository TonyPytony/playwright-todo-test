import { test } from '../fixtures';
import {todos} from "../../data/todoData";

test.describe('TodoMVC @ui', () => {
    test('should add, complete, uncompleted, delete and validate todos @smoke', async ({todoPage}) => {

        await todoPage.addTodos(todos.learn, todos.write, todos.run);
        await todoPage.expectTodos([todos.learn, todos.write, todos.run]);
        await todoPage.expectTodosCount(3);

        await todoPage.completeTodo(0);
        await todoPage.expectTodosCompleted([0]);

        await todoPage.uncompletedTodo(0);
        await todoPage.expectTodosNotCompleted([0, 1, 2]);

        await todoPage.deleteTodo(2);
        await todoPage.expectTodosCount(2);
        await todoPage.expectTodoNotExists(todos.run);
    });
});
