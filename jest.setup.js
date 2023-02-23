import '@testing-library/jest-dom/extend-expect';

import { TextDecoder, TextEncoder } from 'util';
import 'isomorphic-fetch';

import { server } from '@/__tests__/__mocks__/msw/server';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
