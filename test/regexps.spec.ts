import {expect} from 'chai';

import {NameStartChar, NameChar, Name, STag, ETag, EmptyElemTag} from '../src/regexps';

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
    for (let ch of '-.') {
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });

  it('should match 0-9', () => {
    for (let i = 0; i < 10; i++) {
      let ch = `${i}`;
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });

  it('should match #xB7', () => {
    expect(re.test('\u00B7')).to.be.true;
  });

  it('should match #x0300-#x036F', () => {
    for (let i = 0x0300; i <= 0x036F; i++) {
      let ch = String.fromCharCode(i);
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });

  it('should match #x203F-#x2040', () => {
    for (let i = 0x203F; i <= 0x2040; i++) {
      let ch = String.fromCharCode(i);
      expect(re.test(ch), `didn't match '${ch}'`).to.be.true;
    }
  });
});

describe('Name', () => {
  let re: RegExp;

  before(() => {
    re = RegExp(`^${Name}\$`);
  });

  it('should match an alphabetic string', () => {
    expect(re.test('abc')).to.be.true;
    expect(re.test('Abc')).to.be.true;
    expect(re.test('aBc')).to.be.true;
    expect(re.test('ABC')).to.be.true;
  });

  it('should not match empty spaces', () => {
    expect(re.test(' ')).to.be.false;
    expect(re.test('abc ')).to.be.false;
    expect(re.test(' abc')).to.be.false;
    expect(re.test('abc abc')).to.be.false;
  });

  it('should not match a specifc NameChar as the first character', () => {
    expect(re.test('-abc')).to.be.false;
    expect(re.test('.abc')).to.be.false;
    expect(re.test('3abc')).to.be.false;
  });

  it('should match a specific NameChar as a non-first character', () => {
    expect(re.test('abc-')).to.be.true;
    expect(re.test('abc.')).to.be.true;
    expect(re.test('abc3')).to.be.true;
  });
});

describe('STag', () => {
  let re: RegExp;

  before(() => {
    re = RegExp(STag);
  });

  it('should match a simple opening tag with no attributes', () => {
    const xml = '    <tag>      </tag>     ';
    const match = re.exec(xml);
    expect(match && match[0]).to.equal('<tag>');
  });

  it('should match a simple opening tag with no attributes + space', () => {
    const xml = '  <tag >      </tag>     ';
    const match = re.exec(xml);
    expect(match && match[0]).to.equal('<tag >');
  });

  it('should match a simple opening tag with attributes', () => {
    const xml = `  <tag attr1="x" attr2='y' attr3={0}>   </tag>     `;
    const match = re.exec(xml);
    expect(match && match[0]).to.equal(`<tag attr1="x" attr2='y' attr3={0}>`);
  });

  it('should match a simple opening tag with widely spaced attributes', () => {
    const xml = `  <tag    attr1="x"  attr2='y'    attr3={0} >   </tag>     `;
    const match = re.exec(xml);
    expect(match && match[0]).to.equal(`<tag    attr1="x"  attr2='y'    attr3={0} >`);
  });

  it('should match an attribute with spaces around the equal sign', () => {
    const xml = `<tag attr = "x">`;
    const match = re.exec(xml);
    expect(match && match[0]).to.equal(xml);
  });

  it('should match an attribute with an entity', () => {
    const xml = `<tag attr1="&amp;&lt;&gt;" attr2='1&amp;2'>`;
    const match = re.exec(xml);
    expect(match && match[0]).to.equal(xml);
  });

  it('should match an attribute with a char reference', () => {
    const xml = `<tag attr1="&#1234;&#x12bF;" attr2='&#x0dEaD;&#019;'>`;
    const match = re.exec(xml);
    expect(match && match[0]).to.equal(xml);
  });

  it('should not match a closing tag', () => {
    const xml = '</tag> </other   >';
    expect(re.test(xml)).to.be.false;
  });

  it('should not match a self-closing tag', () => {
    const xml = '<tag/> <other   />';
    expect(re.test(xml)).to.be.false;
  });
});

describe('ETag', () => {
  let re: RegExp;

  before(() => {
    re = RegExp(ETag);
  });

  it('should match a simple closing tag with no attributes', () => {
    const xml = '    <tag>      </tag>     ';
    const match = re.exec(xml);
    expect(match && match[0]).to.equal('</tag>');
  });

  it('should match a simple closing tag with no attributes + space', () => {
    const xml = '  <tag >      </tag  >     ';
    const match = re.exec(xml);
    expect(match && match[0]).to.equal('</tag  >');
  });

  it('should not match an opening tag', () => {
    const xml = `<tag> <other > <foo attr="">   <bar  attr2='abc'>`;
    expect(re.test(xml)).to.be.false;
  });

  it('should not match a self-closing tag', () => {
    const xml = '<tag/> <other   />';
    expect(re.test(xml)).to.be.false;
  });
});

describe('EmptyElemTag', () => {
  let re: RegExp;

  before(() => {
    re = RegExp(EmptyElemTag);
  });

  it('should match a simple self-closing tag with no attributes', () => {
    const xml = '    <tag/>     ';
    const match = re.exec(xml);
    expect(match && match[0]).to.equal('<tag/>');
  });

  it('should match a simple self-closing tag with no attributes + space', () => {
    const xml = '  <tag />      ';
    const match = re.exec(xml);
    expect(match && match[0]).to.equal('<tag />');
  });

  it('should match a simple self-closing tag with attributes', () => {
    const xml = `  <tag attr1="x" attr2='y' attr3={0}/>   `;
    const match = re.exec(xml);
    expect(match && match[0]).to.equal(`<tag attr1="x" attr2='y' attr3={0}/>`);
  });

  it('should match a simple self-closing tag with widely spaced attributes', () => {
    const xml = `  <tag    attr1="x"  attr2='y'    attr3={0} />   `;
    const match = re.exec(xml);
    expect(match && match[0]).to.equal(`<tag    attr1="x"  attr2='y'    attr3={0} />`);
  });

  it('should match an attribute with spaces around the equal sign', () => {
    const xml = `<tag attr = "x"/>`;
    const match = re.exec(xml);
    expect(match && match[0]).to.equal(xml);
  });

  it('should match an attribute with an entity', () => {
    const xml = `<tag attr1="&amp;&lt;&gt;" attr2='1&amp;2'/>`;
    const match = re.exec(xml);
    expect(match && match[0]).to.equal(xml);
  });

  it('should match an attribute with a char reference', () => {
    const xml = `<tag attr1="&#1234;&#x12bF;" attr2='&#x0dEaD;&#019;'/>`;
    const match = re.exec(xml);
    expect(match && match[0]).to.equal(xml);
  });

  it('should not match a closing tag', () => {
    const xml = '</tag> </other   >';
    expect(re.test(xml)).to.be.false;
  });

  it('should not match an opening tag', () => {
    const xml = `<tag> <other   > <foo a="x" b='y' c={0}>`;
    expect(re.test(xml)).to.be.false;
  });
});
