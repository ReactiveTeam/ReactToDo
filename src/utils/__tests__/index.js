import index from '..';
import ID from '../Id';
import Storage from '../Storage';
import Server from '../Server';

describe('index.js должен возвращать объекты', () => {
    test('ID должен быть объектом', () => {
        expect(typeof index.ID).toBe('object');
    });

    test('Storage должен быть объектом', () => {
        expect(typeof index.Storage).toBe('object');
    });

    test('Server должен быть объектом', () => {
        expect(typeof index.Server).toBe('object');
    });


});

describe('Возвращаемые объекты должны соответствовать импортируемым', () => {
    test('ID должен соответствовать', () => {
        expect(index.ID).toEqual(ID);
    });

    test('Storage должен соответствовать', () => {
        expect(index.Storage).toEqual(Storage);
    });

    test('Server должен соответствовать', () => {
        expect(index.Server).toEqual(Server);
    });

});
