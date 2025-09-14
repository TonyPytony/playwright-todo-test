import { test as base, APIRequestContext, request as baseRequest, expect as baseExpect } from '@playwright/test';

type ApiFixtures = {
    apiRequest: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({
    apiRequest: async ({}, use) => {
        const request = await baseRequest.newContext({
            baseURL: 'http://localhost:3000', // твій локальний JSON server
            extraHTTPHeaders: { 'Content-Type': 'application/json' },
        });
        await use(request);
        await request.dispose();
    },
});

export const expect = baseExpect;
