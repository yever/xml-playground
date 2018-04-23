import {expect} from 'chai';

import {DOMParser, DOMImplementation} from 'xmldom';

import {setNamespace} from '../src/namespaces';

const XML = (xml: string): Document => {
  const domParser = new DOMParser();
  return domParser.parseFromString(xml);
}


describe('elements()', () => {
});

const MATHML_URI = "http://www.w3.org/1998/Math/MathML";

describe('setNamespace()', () => {
  it('should recursively change the namespace', () => {
    const doc = XML(`<root><other/><child>yellow</child><child>submarine</child></root>`);
    const m = {
      prefix: 'm',
      uri: MATHML_URI
    };

    setNamespace(doc, m);

    expect(doc.toString()).to.equal(
      "<m:root xmlns:m=\"http://www.w3.org/1998/Math/MathML\">" +
      "<m:other/>" +
      "<m:child>yellow</m:child>" +
      "<m:child>submarine</m:child>" +
      "</m:root>"
    );
  });
});
