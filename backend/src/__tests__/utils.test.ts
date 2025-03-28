import { generateSessionCode } from '../utils/generateSessionCode.js';

describe('Session Code Generator', () => {
  test('should generate an 8-character session code', () => {
    const code = generateSessionCode();
    expect(code).toMatch(/^[A-Z0-9]{8}$/);
  });
});
