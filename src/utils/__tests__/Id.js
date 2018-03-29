import ID from '../Id';

describe('Все методы класса должны возвращать ID', () => {
    test('метод getId должен возвращать ID', () => {
        expect(/[A-Za-z0-9]{15}/.test(ID.getId())).toBeTruthy();
    });

    test('свойство id должно возвращать ID', () => {
        expect(/[A-Za-z0-9]{15}/.test(ID.id)).toBeTruthy();
    });

});

describe('ID должны быть уникальными', () => {
    test('метод getId должен возвращать уникальный ID', () => {
        expect(ID.getId() === ID.getId()).toBeFalsy();
    });

    test('свойство id должно возвращать уникальный ID', () => {
        expect(ID.id === ID.id).toBeFalsy();
    });
});
