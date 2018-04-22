import {expect} from 'chai';

import {
  STagTemplate, ETagTemplate, EmptyElemTagTemplate,
  TemplatedTagsPattern,
  replaceTags
} from '../src/fix-templated-tags';

describe('STagTemplate', () => {
  let re: RegExp;

  before(() => {
    re = RegExp(STagTemplate);
  });

  it('should not match a normal opening tag', () => {
    const xml = `<tag>`;
    expect(re.test(xml)).to.be.false;
  });

  it('should match a simple templated opening tag', () => {
    const xml = `<{0}>`;
    const match = re.exec(xml);
    expect(match && match[0]).to.eql(xml);
  });

  it('should match a simple templated opening tag with spaces', () => {
    const xml = `<{  0  }>`;
    const match = re.exec(xml);
    expect(match && match[0]).to.eql(xml);
  });

  it('should match a simple templated opening tag with attributes', () => {
    const xml = `<{0} attr1="x" attr2='y' attr3={0}>`;
    const match = re.exec(xml);
    expect(match && match[0]).to.eql(xml);
  });

  it('should match a simple templated opening tag with spaced out attributes', () => {
    const xml = `<{0}    attr1="x"  attr2='y'    attr3={0} >`;
    const match = re.exec(xml);
    expect(match && match[0]).to.eql(xml);
  });

  it('should match an attribute with spaces around the equal sign', () => {
    const xml = `<{1} attr = "x">`;
    const match = re.exec(xml);
    expect(match && match[0]).to.equal(xml);
  });

  it('should match an attribute with an entity', () => {
    const xml = `<{0} attr1="&amp;&lt;&gt;" attr2='1&amp;2'>`;
    const match = re.exec(xml);
    expect(match && match[0]).to.equal(xml);
  });

  it('should match an attribute with a char reference', () => {
    const xml = `<{0  } attr1="&#1234;&#x12bF;" attr2='&#x0dEaD;&#019;'>`;
    const match = re.exec(xml);
    expect(match && match[0]).to.equal(xml);
  });

  it('should not match a closing tag', () => {
    const xml = '</{0}> </{1}   >';
    expect(re.test(xml)).to.be.false;
  });

  it('should not match a self-closing tag', () => {
    const xml = '<{0}/> <{1}   />';
    expect(re.test(xml)).to.be.false;
  });
});

describe('ETagTemplate', () => {
  let re: RegExp;

  before(() => {
    re = RegExp(ETagTemplate);
  });

  it('should match a simple templated closing tag with no attributes', () => {
    const xml = '    <{0}>      </{0}>     ';
    const match = re.exec(xml);
    expect(match && match[0]).to.equal('</{0}>');
  });

  it('should match a simple templated closing tag with no attributes + space', () => {
    const xml = '  <{ 0 } >      </{ 0 }  >     ';
    const match = re.exec(xml);
    expect(match && match[0]).to.equal('</{ 0 }  >');
  });

  it('should not match an opening tag', () => {
    const xml = `<{0}> <{1} > <{3} attr="">   <{ 4}  attr2='abc'>`;
    expect(re.test(xml)).to.be.false;
  });

  it('should not match a self-closing tag', () => {
    const xml = '<{0 }/> <{ 1}   />';
    expect(re.test(xml)).to.be.false;
  });
});

describe('EmptyElemTagTemplate', () => {
  let re: RegExp;

  before(() => {
    re = RegExp(EmptyElemTagTemplate);
  });

  it('should match a simple self-closing tag with no attributes', () => {
    const xml = '    <{0}/>     ';
    const match = re.exec(xml);
    expect(match && match[0]).to.equal('<{0}/>');
  });

  it('should match a simple self-closing tag with no attributes + space', () => {
    const xml = '  <{ 0 } />      ';
    const match = re.exec(xml);
    expect(match && match[0]).to.equal('<{ 0 } />');
  });

  it('should match a simple self-closing tag with attributes', () => {
    const xml = `  <{0} attr1="x" attr2='y' attr3={0}/>   `;
    const match = re.exec(xml);
    expect(match && match[0]).to.equal(`<{0} attr1="x" attr2='y' attr3={0}/>`);
  });

  it('should match a simple self-closing tag with widely spaced attributes', () => {
    const xml = `  <{0}    attr1="x"  attr2='y'    attr3={0} />   `;
    const match = re.exec(xml);
    expect(match && match[0]).to.equal(`<{0}    attr1="x"  attr2='y'    attr3={0} />`);
  });

  it('should match an attribute with spaces around the equal sign', () => {
    const xml = `<{0} attr = "x"/>`;
    const match = re.exec(xml);
    expect(match && match[0]).to.equal(xml);
  });

  it('should match an attribute with an entity', () => {
    const xml = `<{0} attr1="&amp;&lt;&gt;" attr2='1&amp;2'/>`;
    const match = re.exec(xml);
    expect(match && match[0]).to.equal(xml);
  });

  it('should match an attribute with a char reference', () => {
    const xml = `<{0} attr1="&#1234;&#x12bF;" attr2='&#x0dEaD;&#019;'/>`;
    const match = re.exec(xml);
    expect(match && match[0]).to.equal(xml);
  });

  it('should not match a closing tag', () => {
    const xml = '</{0}> </{1}   >';
    expect(re.test(xml)).to.be.false;
  });

  it('should not match an opening tag', () => {
    const xml = `<{0}> <{1}   > <{3} a="x" B='Y' C={4}>`;
    expect(re.test(xml)).to.be.false;
  });
});

describe('TemplatedTagsPattern', () => {
  it('should find templated tags', () => {
    const xml = `<{0}> </{1}> <{2}/>`;
    const match = xml.match(TemplatedTagsPattern);
    expect(match && match[0]).to.eql('<{0}>');
    expect(match && match[1]).to.eql('</{1}>');
    expect(match && match[2]).to.eql('<{2}/>');

  });
});

describe('replaceTag', () => {
  it('should replace templated opening tags', () => {
    const xml =`<{0}> <{ 1  } a="a" b='123' C={4}>`;
    const result = replaceTags(xml, ['tagA', 'tagB']);
    expect(result).to.equal(`<tagA> <tagB a="a" b='123' C={4}>`);
  });

  it('should replace templated closing tags', () => {
    const xml =`</{ 0}> </{1  } >`;
    const result = replaceTags(xml, ['foo', 'bar']);
    expect(result).to.equal(`</foo> </bar >`);
  });

  it('should replace templated self-closing tags', () => {
    const xml =`<{ 0}/> <{1  } a="A" b='123'  c={3}  />`;
    const result = replaceTags(xml, ['foo', 'bar']);
    expect(result).to.equal(`<foo/> <bar a="A" b='123'  c={3}  />`);
  });

  it('should not replace if args are not given', () => {
    const xml = `<{0}> </{ 1}> <{2 > />`;
    const result = replaceTags(xml, []);
    expect(result).to.equal(xml);
  });
});
