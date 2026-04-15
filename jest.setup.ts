import { expect } from '@jest/globals';
import * as matchers from '@testing-library/jest-dom/matchers';

const actualMatchers = matchers.default ? matchers.default : matchers;

expect.extend(actualMatchers);
