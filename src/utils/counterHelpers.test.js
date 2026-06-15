import { formatCountDisplay } from './counterHelpers';
import { describe, expect, test } from '@jest/globals';

describe('Counter Helpers', () => {
    test('Validates counter formatting boundary thresholds', () => {
        expect(formatCountDisplay(0)).toBe('Count: 0');
        expect(formatCountDisplay(5)).toBe('Count: 5');
        expect(formatCountDisplay(100)).toBe('Count: 99+');
        expect(formatCountDisplay(-10)).toBe('Count: 0');
    });
});