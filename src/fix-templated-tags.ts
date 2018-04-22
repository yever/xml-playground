import {Name, Attribute, Template} from './regexps';

export const STagTemplate = `<${Template}(\\s+${Attribute})*\\s*>`;

export const ETagTemplate = `<\/${Template}\\s*>`;

export const EmptyElemTagTemplate = `<${Template}(\\s+${Attribute})*\\s*\/>`;

export const TemplatedTags = `(${[STagTemplate, ETagTemplate, EmptyElemTagTemplate].join('|')})`;
export const TemplatedTagsPattern = RegExp(TemplatedTags, 'g');

const REPLACE_TEMPLATED_TAG_PATTERN = RegExp(`^<(\/?)(${Template})`);

export const replaceTags = (
  xml: string,
  tags: { [id: number]: string }
) => xml.replace(TemplatedTagsPattern, (match, ...args) => match.replace(
    REPLACE_TEMPLATED_TAG_PATTERN, 
    (full, closing, __, id) => {
      const tag = tags[+id];
      return tag ? `<${closing}${tag}` : full;
    }
));
