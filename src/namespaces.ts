
export type Namespace = {
  prefix: string;
  uri: string;
};

const ELEMENT_NODE = 1;

const renameNamespaceRecursive = (
  doc: Document, node: Node, uri: string, prefix: string, oldPrefix: string
): Node => {
  const parent = node.parentNode;

  if (!parent || node.nodeType !== ELEMENT_NODE) {
    return node;
  }

  const element = node as Element;
  const localName = element.localName as string;

  if (oldPrefix === (element.prefix || '')) {
    const newElement = doc.createElementNS(uri, prefix ? `${prefix}:${localName}` : localName);

    for (let i = 0; i < element.childNodes.length; i++) {
      const childNode = element.childNodes[i];
      newElement.appendChild(
        renameNamespaceRecursive(doc, childNode, uri, prefix, oldPrefix)
      );
    }

    return newElement;
  }

  return node;
};

export const setNamespace = (doc: Document, ns: Namespace): void => {
  const element = doc.firstChild as Element;

  const newElement = renameNamespaceRecursive(
    doc,
    element,
    ns.uri,
    ns.prefix,
    element.prefix || ''
  );

  if (element !== newElement) {
    doc.removeChild(element);
    doc.appendChild(newElement);
  }
};
