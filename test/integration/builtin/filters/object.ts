import { test } from '../../../stub/render'

describe('filters/object', function () {
  describe('default', function () {
    it('false should use default', () => test('{{false | default: "a"}}', 'a'))
    it('empty string should use default', () => test('{{"" | default: "a"}}', 'a'))
    it('non-empty string should not use default', () => test('{{" " | default: "a"}}', ' '))
    it('nil should use default', () => test('{{nil | default: "a"}}', 'a'))
    it('undefined should use default', () => test('{{not_defined | default: "a"}}', 'a'))
    it('true should not use default', () => test('{{true | default: "a"}}', 'true'))
    it('0 should not use default', () => test('{{0 | default: "a"}}', '0'))
  })
})
