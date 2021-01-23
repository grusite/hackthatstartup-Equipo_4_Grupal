describe('users', () => {
    it('should response with a user list', async () => {
        const res = await global.request.get('/user')
        expect(res).toRespondSuccess()
        expect(res.body.data[0]).toMatchObject({
            email: expect.any(String),
            name: expect.any(String),
        })
    })
    it('should response with a determined user(email)', async () => {
        const res = await global.request.get('/user/jorge.martinoliver@gmail.com')
        expect(res).toRespondData({
            email: expect.any(String),
            name: expect.any(String),
        })
    })
    it('should response with an Error text', async () => {
        const res = await global.request.get('/user/inventedEmail')
        expect(res).toRespondErrorData('Error: User not found')
    })
})
