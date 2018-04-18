import {expect} from 'chai';

import {NameStartChar, NameChar} from '../src/regexps';

describe('NameStartChar', () => {
  let re: RegExp;

  before(() => {
    re = RegExp(NameStartChar);
  });

  it('should match :, _', () => {
    expect(re.test(':')).to.be.true;
    expect(re.test('_')).to.be.true;
  });

  it('should match A-Z', () => {
    for (let ch of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });

  it('should match a-z', () => {
    for (let ch of 'abcdefghijklmnopqrstuvwxyz') {
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });

  it('should match #xC0-#xD6', () => {
    for (let i = 0x00C0; i <= 0x00D6; i++) {
      let ch = String.fromCharCode(i);
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });

  it('should match #xD8-#xF6', () => {
    for (let i = 0x00D8; i <= 0x00F6; i++) {
      let ch = String.fromCharCode(i);
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });

  it('should match #xF8-#x2FF', () => {
    for (let i = 0x00F8; i <= 0x02FF; i++) {
      let ch = String.fromCharCode(i);
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });

  it('should match #x370-#x37D', () => {
    for (let i = 0x0370; i <= 0x037D; i++) {
      let ch = String.fromCharCode(i);
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });

  it('should match #x37F-#x1FFF', () => {
    for (let i = 0x037F; i <= 0x1FFF; i++) {
      let ch = String.fromCharCode(i);
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });

  it('should match #x200C-#x200D', () => {
    for (let i = 0x200C; i <= 0x200D; i++) {
      let ch = String.fromCharCode(i);
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });

  it('should match #x2070-#x218F', () => {
    for (let i = 0x2070; i <= 0x218F; i++) {
      let ch = String.fromCharCode(i);
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });

  it('should match #x2C00-#x2FEF', () => {
    for (let i = 0x2C00; i <= 0x2FEF; i++) {
      let ch = String.fromCharCode(i);
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });

  it('should match #x3001-#xD7FF', () => {
    for (let i = 0x3001; i <= 0xD7FF; i++) {
      let ch = String.fromCharCode(i);
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });

  it('should match #xF900-#xFDCF', () => {
    for (let i = 0xF900; i <= 0xFDCF; i++) {
      let ch = String.fromCharCode(i);
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });

  it('should match #xFDF0-#xFFFD', () => {
    for (let i = 0xFDF0; i <= 0xFFFD; i++) {
      let ch = String.fromCharCode(i);
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });
});

describe('NameChar', () => {
  let re: RegExp;

  before(() => {
    re = RegExp(NameChar);
  });

  it('should match a-z', () => {
    for (let ch of 'abcdefghijklmnopqrstuvwxyz') {
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });

  it('should match A-Z', () => {
    for (let ch of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });

  it('should match -, .', () => {
    expect
  });
});
