module.exports = (request, response, stack, next) => {
    const base = 'https://vcb.dientu.space/';
    throw new Error('woke');
    try {
        console.log(request);
        response.json({ work: 1 })
    } catch (e) {
        next(e);
    }
}