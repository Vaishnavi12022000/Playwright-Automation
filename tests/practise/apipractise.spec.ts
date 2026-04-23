import { test, expect } from "@playwright/test";

test.describe.serial("testcases ", () => {
    const apiBaseURL = 'https://restful-booker.herokuapp.com';
    let id: number;
    let token: string;
    test('Create auth token', async ({ request }) => {
        const res = await request.post(`${apiBaseURL}/auth`, {
            data: {
                username: 'admin',
                password: 'password123'
            }
        });
        expect(res.status()).toBe(200);
        const body = await res.json();
        token = body.token;
        console.log("token", token);
    });

    test('Create Booking', async ({ request }) => {
        const res1 = await request.post(`${apiBaseURL}/booking`, {
            data: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2026-04-22",
                    "checkout": "2026-04-23"
                },
                "additionalneeds": "Breakfast"
            }
        });
        expect(res1.status()).toBe(200);
        const body = await res1.json();
        id = body.bookingid;
        console.log("id", id);
    });

    test('Get booking', async ({ request }) => {
        console.log("Using ID:", id);
        const res2 = await request.get(`${apiBaseURL}/booking/${id}`);
        expect(res2.status()).toBe(200);
        const body = await res2.json();
        console.log("firstname", body.firstname);
    });

    test('update booking', async ({ request }) => {
        console.log("Update ID:", id);
        const res3 = await request.put(`${apiBaseURL}/booking/${id}`, {
            headers: {
                Cookie: `token=${token}`
            },
            data: {
                "firstname": "JOhn",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2026-04-22",
                    "checkout": "2026-04-23"
                },
                "additionalneeds": "Lunch"
            }
        });
        expect(res3.status()).toBe(200);
        const body1 = await res3.json();
        console.log("firstname", body1.firstname);
    });

    test('delete', async ({ request }) => {
         console.log("Delete ID:", id);
        const res4 = await request.delete(`${apiBaseURL}/booking/${id}`,{
            headers:{
                Cookie: `token=${token}`
            }
        });
        expect(res4.status()).toBe(201);
        const body2 = await res4.text();
        console.log("delete response", body2);
    })

});