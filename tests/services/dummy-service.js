import { execute } from '../../src/servies/dummy-service.js';

test('result is true and returns Learning JS', () => {
    // IMPL of test
    const result = execute();
    expect(result).toBe('Learning');
})