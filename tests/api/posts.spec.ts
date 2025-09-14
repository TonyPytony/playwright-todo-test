import { test, expect } from './fixtures';

const postPayloads = [
    { title: 'Learn Playwright', body: 'API Testing', userId: 1 },
    { title: 'Write Tests', body: 'Fullstack QA', userId: 2 }
];

test.describe('Posts API CRUD Flow @api', () => {
    postPayloads.forEach((payload) => {
        test(`CRUD flow for post: "${payload.title}"`, async ({ apiRequest }) => {
            let createdPostId: string;

            // CREATE
            await test.step('Create a new post', async () => {
                const response = await apiRequest.post('/posts', { data: payload });
                expect(response.status()).toBe(201);
                const data = await response.json();
                expect(data).toMatchObject(payload);
                createdPostId = data.id;

                await test.info().attach('POST Response', {
                    body: JSON.stringify(data, null, 2),
                    contentType: 'application/json',
                });
            });

            // READ
            await test.step('Get the created post', async () => {
                const response = await apiRequest.get(`/posts/${createdPostId}`);
                expect(response.status()).toBe(200);
                const data = await response.json();
                expect(data.id).toBe(createdPostId);

                await test.info().attach('GET Response', {
                    body: JSON.stringify(data, null, 2),
                    contentType: 'application/json',
                });
            });

            // UPDATE
            await test.step('Update the post', async () => {
                const updatePayload = { ...payload, id: createdPostId, title: payload.title + ' Updated' };
                const response = await apiRequest.put(`/posts/${createdPostId}`, { data: updatePayload });
                expect(response.status()).toBe(200);
                const data = await response.json();
                expect(data.title).toBe(updatePayload.title);

                await test.info().attach('PUT Response', {
                    body: JSON.stringify(data, null, 2),
                    contentType: 'application/json',
                });
            });

            // DELETE
            await test.step('Delete the post', async () => {
                const response = await apiRequest.delete(`/posts/${createdPostId}`);
                expect(response.status()).toBe(200);
            });

            // VERIFY DELETE
            await test.step('Verify post is deleted', async () => {
                const response = await apiRequest.get(`/posts/${createdPostId}`);
                expect(response.status()).toBe(404);
            });
        });
    });
});
