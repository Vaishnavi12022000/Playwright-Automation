import { test, expect } from "@playwright/test";
test.describe.serial("testcases ", () => {
    const apiBaseURL = 'https://fakerestapi.azurewebsites.net/';
    // let id: number;
    test('get all the books', async ({ request }) => {
        const res = await request.get(`${apiBaseURL}//api/v1/Books`);
        expect(res.status()).toBe(200);
        console.log(res);
        const headers = res.headers();
        // Validate specific headers
        expect(headers['content-type']).toContain('application/json');
        expect(headers).toHaveProperty('date');
        expect(headers).toHaveProperty('server');
        if (headers['content-length']) {
            expect(Number(headers['content-length'])).toBeGreaterThan(0);
        }
    });

    test('post the book', async ({ request }) => {
        const payload = {
            "id": 1001,
            "title": "playwright testing",
            "description": "API automation practise",
            "pageCount": 250,
            "excerpt": "learning playwright API",
            "publishDate": new Date().toISOString()
        };
        const res = await request.post(`${apiBaseURL}/api/v1/Books`, {
            data: payload
        });
        const body = await res.json();
        expect(body.id).toBe(payload.id);
        expect(body.title).toBe(payload.title);
        console.log("id", body.id);
        console.log("title", body.title);
        //  id = body.id;
    });

    test('get the book by id', async ({ request }) => {
        // console.log("Using ID:", id);
        const bookID = 1;
        const res = await request.get(`${apiBaseURL}/api/v1/Books/${bookID}`);
        expect(res.status()).toBe(200);
        const body = await res.json();
        expect(body.id).toBe(bookID);
        expect(body).toHaveProperty('title');
        expect(body).toHaveProperty('description');
        expect(body).toHaveProperty('pageCount');
        expect(body).toHaveProperty('excerpt');
        expect(body).toHaveProperty('publishDate');
        expect(typeof body.title).toBe('string');
        expect(typeof body.pageCount).toBe('number');
        expect(body.title.length).toBeGreaterThan(0);
        expect(body.pageCount).toBeGreaterThan(0);
        console.log("retrieved id", body.id);
    });

    test('get the book by invalidid should return 404', async ({ request }) => {
        const invalidID = 9999999;
        const res = await request.get(`${apiBaseURL}/api/v1/Books/${invalidID}`);
        expect(res.status()).toBe(404);
        const bodyText = await res.text();
        expect(bodyText).toBeTruthy();
        console.log("error message", bodyText);
    });

    test('update the book', async ({ request }) => {
        const Bookid = 1;
        const updatedpayload = {
            "id": Bookid,
            "title": "Updated title",
            "description": "Updated API automation practise",
            "pageCount": 500,
            "excerpt": "Updated learning playwright API",
            "publishDate": new Date().toISOString()
        };
        const res = await request.put(`${apiBaseURL}/api/v1/Books/${Bookid}`, {
            data: updatedpayload
        });
        expect(res.status()).toBe(200);
        const headers = res.headers();
        // Validate specific headers
        expect(headers['content-type']).toContain('application/json');
        const body = await res.json();
        expect(body.id).toBe(Bookid);
        expect(body.title).toBe(updatedpayload.title);
        expect(body.description).toBe(updatedpayload.description);
        expect(body.pageCount).toBe(updatedpayload.pageCount);
        console.log("updated payload response title", body.title);
    });

    test('delete the book', async ({ request }) => { 
        const bid=1;
        const res1=await request.delete(`${apiBaseURL}/api/v1/Books/${bid}`);
        expect(res1.status()).toBe(200);
        const res2 =await request.delete(`${apiBaseURL}/api/v1/Books/${bid}`);
        expect([200,404]).toContain(res2.status());
        const result =await res1.text();
        console.log(res1);
    });
});
