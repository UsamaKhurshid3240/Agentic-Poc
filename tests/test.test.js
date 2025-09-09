Here's a Jest test file that covers the specified test plan for the provided JavaScript code. Each function is tested according to the requirements outlined in your test plan.

```javascript
const {
  getPassword,
  getEncryptedPassword,
  generateEmailAddress,
  generateCompanyEmailAddress,
  convertFileSizeToFriendly,
  getUrid,
  getTemplate,
  getBasePath,
  capitalise,
  isNumber,
  validateULID,
  validateUUID,
  getFileName,
  preSignedAttachment,
  getDistance,
  replaceShortCode,
  getArray,
  insertCDATATag,
} = require('./path/to/your/module'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');
const axios = require('axios');
const moment = require('moment');
const { BadRequestError } = require('../errors/BadRequestError');
const { Account, Company } = require('../database/models');

jest.mock('axios');
jest.mock('../database/models');

describe('Utility Functions', () => {
  test('getPassword generates a random password that meets specific criteria', () => {
    const password = getPassword();
    expect(password).toMatch(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9\.\-]+){6,15}$/);
    expect(password).toContain('A@1c');
  });

  test('getEncryptedPassword encrypts the provided password using bcrypt', async () => {
    const password = 'testPassword';
    const encryptedPassword = await getEncryptedPassword(password);
    const match = await bcrypt.compare(password, encryptedPassword);
    expect(match).toBe(true);
  });

  test('generateEmailAddress creates a unique email address based on the provided username', async () => {
    const username = 'testuser';
    Account.count.mockResolvedValue(0); // Simulate no existing email
    const email = await generateEmailAddress(username);
    expect(email).toMatch(new RegExp(`^${username}\\.[0-9]+@`));
  });

  test('generateCompanyEmailAddress creates a unique company email address based on the provided company name', async () => {
    const companyName = 'testcompany';
    Company.count.mockResolvedValue(0); // Simulate no existing email
    const email = await generateCompanyEmailAddress(companyName);
    expect(email).toMatch(new RegExp(`^${companyName}\\.[0-9]+@`));
  });

  test('convertFileSizeToFriendly converts a file size in bytes to a human-readable format', () => {
    expect(convertFileSizeToFriendly(1024)).toBe('1 kB');
    expect(convertFileSizeToFriendly(1048576)).toBe('1 MB');
    expect(convertFileSizeToFriendly(null)).toBe('0 kB');
  });

  test('getUrid generates a unique identifier based on request headers', () => {
    const reqObj = {
      headers: {
        'user-agent': 'Mozilla/5.0',
        'cf-ipcountry': 'US',
      },
    };
    const urid = getUrid(reqObj);
    expect(urid).toBeDefined();
  });

  test('getTemplate compiles and returns a template with the provided data', () => {
    const templatePath = 'path/to/template.ejs'; // Adjust as necessary
    const data = { title: 'Test Title' };
    const compiledTemplate = getTemplate(templatePath, data);
    expect(compiledTemplate).toBeDefined();
  });

  test('getBasePath returns the base path of the current directory', () => {
    const basePath = getBasePath();
    expect(basePath).toBeDefined();
  });

  test('capitalise capitalizes the first letter of each word in a string', () => {
    expect(capitalise('hello_world')).toBe('Hello World');
    expect(capitalise('test_string')).toBe('Test String');
  });

  test('isNumber checks if the provided value is a number', async () => {
    expect(await isNumber(123)).toBe(true);
    expect(await isNumber('123')).toBe(true);
    expect(await isNumber('abc')).toBe(false);
    expect(await isNumber(null)).toBe(false);
  });

  test('validateULID validates if the provided key is a valid ULID or Nano ID', () => {
    expect(() => validateULID('01F8MECHZX3TBDSZ7FJ9D1C1Z5')).not.toThrow();
    expect(() => validateULID('abc123')).toThrow(BadRequestError);
  });

  test('validateUUID validates if the provided key is a valid UUID', () => {
    expect(() => validateUUID('123e4567-e