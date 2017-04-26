/**
 * Created by Przemek on 2017-04-26.
 */
describe('getRandomMeteorite', () => {
    it('should choose one random item from array', () => {
        const sampleArray = [...Array(1000).keys()];
        const sampleItem1 = meteoriteModule.getRandomMeteoriteFrom(sampleArray);
        const sampleItem2 = meteoriteModule.getRandomMeteoriteFrom(sampleArray);
        expect(sampleItem1).toBeLessThanOrEqual(1000);
    })
});