export default () => ({
    apis: {
        in: {
            jwt: {
                address: 'http://localhost:8004',
                url: {
                    v1: {
                        create: '/api/v1/jwt',
                        detail: '/api/v1/jwt'
                    }
                }
            }
        },
        out: {}
    }
});
