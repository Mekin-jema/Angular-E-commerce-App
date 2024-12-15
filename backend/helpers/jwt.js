import { expressjwt } from 'express-jwt';

function authJwt() {
    const secret = process.env.secret;
    // console.log(secret);
    const api = process.env.API_URL;
    // console.log(api);
    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            //     { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            //     { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            //     { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            //     { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
            //     `${api}/users/login`,
            //     `${api}/users/register`
            { url: /(.*)/ }
        ]
    });
}

async function isRevoked(req, payload) {
    // console.log(payload);
    if (!payload.payload.isAdmin) {
        console.log('Not Admin');
        return true;
    }
    // console.log('Admin');
    return false;
}

export default authJwt;
