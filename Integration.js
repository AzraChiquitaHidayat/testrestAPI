import http from 'k6/http';
import { check } from 'k6';

export default function () {
    // Skenario untuk API Create
    const createUserUrl = 'https://reqres.in/api/users';
    const createUserPayload = JSON.stringify({
        name: 'morpheus',
        job: 'leader'
    });
    const createUserParams = {
        headers: {
            'Content-Type': 'application/json'
        },
    };
    const createResponse = http.post(createUserUrl, createUserPayload, createUserParams);
    check(createResponse, {
        'API Create is successful': (resp) => resp.status === 201,
        'API Create is within response time tolerance': (resp) => resp.timings.duration < 2000,
    });

    // Skenario untuk API Update
    const updateUserUrl = 'https://reqres.in/api/users/2';
    const updateUserPayload = JSON.stringify({
        name: 'morpheus',
        job: 'zion resident'
    });
    const updateUserParams = {
        headers: {
            'Content-Type': 'application/json'
        },
    };
    const updateResponse = http.put(updateUserUrl, updateUserPayload, updateUserParams);
    check(updateResponse, {
        'API Update is successful': (resp) => resp.status === 200,
        'API Update is within response time tolerance': (resp) => resp.timings.duration < 2000,
    });
}
