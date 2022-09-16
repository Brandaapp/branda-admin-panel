import { expect } from 'chai';
import { isValidHttpUrl } from '../../utils/httpUtils.mjs'; 

describe('httpUtils', () => {
    it('validates correct URL without protocol', () => {
        const incorrect = 'www.google.com';
        expect(isValidHttpUrl(incorrect)).to.be.false;
    });

    it('validates correct URL with protocol', () => {
        const correct = 'https://www.google.com';
        expect(isValidHttpUrl(correct)).to.be.true;
    });

    it('validates URL with query string', () => {
        const correct = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        expect(isValidHttpUrl(correct)).to.be.true;
    });

    it('validates non-normal URLs', () => {
        const correct = 'http://127.0.0.1:3000/';
        expect(isValidHttpUrl(correct)).to.be.true;
    });

    it('will not validate URL without address ending', () => {
        const incorrect = 'https://www.google.';
        expect(isValidHttpUrl(incorrect)).to.be.false;
    });
});