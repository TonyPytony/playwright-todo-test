import { test, expect } from './fixtures';
import posts from '../../data/posts.json';

// Хелпер для Allure attach
async function attachStep(name: string, data: any) {
    await test.info().attach(name, {
        body: JSON.stringify(data, null, 2),
        contentType: 'application/json',
    });
}

type PostPayload = {
    title: string;
    body: string;
    userId: number;
};

const postPayloads: PostPayload[] = posts;

test.describe.parallel('Posts API CRUD Flow @api', () => {
    postPayloads.forEach((payload, index) => {
        const tag = index === 0 ? '@smoke' : '@regression'; // перший payload – smoke, решта – regression

        test(`CRUD flow for post: "${payload.title}" ${tag}`, async ({ apiRequest }) => {
            let createdPostId: string;

            // CREATE
            await test.step('Create a new post', async () => {
                    await attachStep('POST Request', payload);

                const response = await apiRequest.post('/posts', { data: payload });
                expect(response.status()).toBe(201);

                const data = await response.json();
                expect(data).toMatchObject(payload);
                createdPostId = data.id;

                await attachStep('POST Response', data);
            });

            // READ
            await test.step('Get the created post', async () => {
                const response = await apiRequest.get(`/posts/${createdPostId}`);
                expect(response.status()).toBe(200);

                const data = await response.json();
                expect(data.id).toBe(createdPostId);

                await attachStep('GET Response', data);
            });

            // UPDATE
            await test.step('Update the post', async () => {
                const updatePayload = { ...payload, id: createdPostId, title: payload.title + ' Updated' };
                await attachStep('PUT Request', updatePayload);

                const response = await apiRequest.put(`/posts/${createdPostId}`, { data: updatePayload });
                expect(response.status()).toBe(200);

                const data = await response.json();
                expect(data.title).toBe(updatePayload.title);

                await attachStep('PUT Response', data);
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
