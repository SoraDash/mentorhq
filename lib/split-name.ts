export interface NameParts {
  firstName: string;
  lastName: string;
}

export function splitName(name: string): NameParts {
  const words = name.split(' ');
  if (words.length === 1) {
    return { firstName: words[0], lastName: '' };
  } else {
    return { firstName: words[0], lastName: words[words.length - 1] };
  }
}