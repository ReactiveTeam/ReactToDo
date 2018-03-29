import Storage from '../Storage';

describe('Проверка на наличие методов', () => {
    test('save', () => {
        expect(typeof Storage.save).toBe('function');
    });

    test('load', () => {
        expect(typeof Storage.load).toBe('function');
    });

    test('get', () => {
        expect(typeof Storage.get).toBe('function');
    });

    test('set', () => {
        expect(typeof Storage.set).toBe('function');
    });

});

describe('Проверка работоспособности методов get и set', () => {
    test('set должен сохранять значение в кэш', () => {
        Storage.set('jesttest', 'ok');
        expect(Storage.storage.jesttest).toBe('ok');
    });

    test('get должен получать значение из кэша', () => {
        expect(Storage.get('jesttest')).toBe('ok');
    });

});

global.localStorage = {};

localStorage.setItem = jest.fn();
localStorage.getItem = jest.fn();

describe('Сохранение и загрузка данных в LocalStorage должны выполняться единожды при необходимости', () => {
    test('Сохранение должно выполняться единожды', () => {
        Storage.save();
        expect(localStorage.setItem.mock.calls.length).toBe(1);
    });

    test('Загрузка должна выполняться единожды', () => {
        Storage.load();
        expect(localStorage.getItem.mock.calls.length).toBe(1);
    });

});