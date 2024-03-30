import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { htmlReport } from './lib/bundle.js';

export const options = {
    vus: 1000,
    iterations: 3500,
    thresholds: {
        http_req_duration: ['avg < 2000'],
        http_req_failed: ['rate< 0.1'],
    },
};

export default function () {
    group('API Create', function () {
        const createPayload = JSON.stringify({
            name: 'morpheus',
            job: 'leader'
        });

        const createParams = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const createResponse = http.post('https://reqres.in/api/users', createPayload, createParams);
        check(createResponse, {
            'Create API is successful': (res) => res.status === 201,
            'Response name and job should same with request': (res) => {
                let responseBody = JSON.parse(res.body);
                return responseBody.name === 'morpheus' && responseBody.job === 'leader';
            }
        });

        // Menunggu 1 detik sebelum melanjutkan ke operasi berikutnya
        sleep(1);
    });

    group('API Update', function () {
        const updatePayload = JSON.stringify({
            name: 'morpheus',
            job: 'zion resident'
        });

        const updateParams = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const updateResponse = http.put('https://reqres.in/api/users/2', updatePayload, updateParams);
        check(updateResponse, {
            'Update API is successful': (res) => res.status === 200,
            'Response name and job should same with request': (res) => {
                let responseBody = JSON.parse(res.body);
                return responseBody.name === 'morpheus' && responseBody.job === 'zion resident';
            }
        });

        // Menunggu 1 detik sebelum melanjutkan ke operasi berikutnya
        sleep(1);
    });
}

export function handleSummary(data) {
    return {
        "./report.html": htmlReport(data),
    };
}
