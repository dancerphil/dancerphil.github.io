interface CompactOptions {
    keepClass?: boolean;
    keepId?: boolean;
    stripScripts?: boolean;
}

const allowedAttributes = new Set([
    'rowspan',
    'colspan',
    'cellpadding',
    'cellspacing',
    'border',
    'href',
    'src',
    'alt',
    'title',
    'name',
    'value',
    'type',
]);

const createParser = () => new DOMParser();

const serialize = (fragment: DocumentFragment) => {
    const container = document.createElement('div');
    container.appendChild(fragment);
    return container.innerHTML.trim();
};

const sanitizeNode = (node: Node, options: Required<CompactOptions>): Node | null => {
    if (node.nodeType === Node.TEXT_NODE) {
        return document.createTextNode(node.textContent ?? '');
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
        return null;
    }

    const element = node as Element;
    const tagName = element.tagName.toLowerCase();

    if (options.stripScripts && (tagName === 'script' || tagName === 'style')) {
        return null;
    }

    const clone = document.createElement(tagName);

    Array.from(element.attributes).forEach((attr) => {
        const name = attr.name.toLowerCase();

        if (name === 'style' || name.startsWith('on')) {
            return;
        }

        if (!options.keepClass && name === 'class') {
            return;
        }

        if (!options.keepId && name === 'id') {
            return;
        }

        if (name.startsWith('data-')) {
            clone.setAttribute(attr.name, attr.value);
            return;
        }

        if (allowedAttributes.has(name)) {
            clone.setAttribute(name, attr.value);
        }
    });

    Array.from(element.childNodes).forEach((child) => {
        const sanitizedChild = sanitizeNode(child, options);
        if (sanitizedChild) {
            clone.appendChild(sanitizedChild);
        }
    });

    return clone;
};

export const compactHtml = (input: string, options: CompactOptions = {}): string => {
    const trimmed = input.trim();

    if (!trimmed) {
        return '';
    }

    const parser = createParser();
    const documentParsed = parser.parseFromString(trimmed, 'text/html');
    const errorNode = documentParsed.querySelector('parsererror');

    if (errorNode) {
        throw new Error('HTML 解析失败，请检查输入内容');
    }

    const compactOptions: Required<CompactOptions> = {
        keepClass: options.keepClass ?? false,
        keepId: options.keepId ?? false,
        stripScripts: options.stripScripts ?? true,
    };

    const fragment = document.createDocumentFragment();

    Array.from(documentParsed.body.childNodes).forEach((node) => {
        const sanitized = sanitizeNode(node, compactOptions);
        if (sanitized) {
            fragment.appendChild(sanitized);
        }
    });

    return serialize(fragment);
};
