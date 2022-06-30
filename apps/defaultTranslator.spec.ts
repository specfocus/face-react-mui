import expect from 'expect';
import { defaultTranslator } from './defaultTranslator';

describe('defaultTranslator', () => {
  it('should use the English translations', () => {
    expect(defaultTranslator.translate('action.edit')).toBe('Edit');
  });
  it('should return the input when the translation is missing', () => {
    expect(defaultTranslator.translate('bar')).toBe('bar');
  });
  it('should not log any warning for missing translations', () => {
    const spy = jest.spyOn(console, 'error');
    defaultTranslator.translate('foo');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
