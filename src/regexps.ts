export const NameStartChar = `[${[
  ':',
  'A-Z',
  '_',
  'a-z',
  '\u00C0-\u00D6',
  '\u00D8-\u00F6',
  '\u00F8-\u02FF',
  '\u0370-\u037D',
  '\u037F-\u1FFF',
  '\u200C-\u200D',
  '\u2070-\u218F',
  '\u2C00-\u2FEF',
  '\u3001-\uD7FF',
  '\uF900-\uFDCF',
  '\uFDF0-\uFFFD'
].join('')}]`;

export const NameChar = `${
  NameStartChar
}|[\-\.0-9\u00B7\u0300-\u036F\u203F-\u2040]`;

export const Name = `${NameStartChar}(${NameChar})*`;

export const Eq = `\\s?=\\s?`;

export const EntityRef = `&${Name};`;

export const CharRef = `&#[0-9]+;|&#x[0-9a-fA-F]+;`;

export const Reference = `${EntityRef}|${CharRef}`;

export const Template = `{\\s*([0-9]+)\\s*}`;

export const AttValue = `(${[
  `"([^<&"]|${Reference})*"`,
  `'([^<&']|${Reference})*'`,
  Template
].join('|')})`;

export const Attribute = `${Name}${Eq}${AttValue}`;

export const STag = `<${Name}(\\s+${Attribute})*\\s*>`;

export const ETag = `<\/${Name}\\s*>`;

export const EmptyElemTag = `<${Name}(\\s+${Attribute})*\\s*\/>`;
