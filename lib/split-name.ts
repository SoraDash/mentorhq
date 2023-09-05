type NameParts = {
  firstName: string;
  lastName: string;
  fullName: string;
  middleName: string;
};

export function splitName(name: string, includeMiddleNameInFirst: boolean = false): NameParts {
  const capitalize = (word: string): string =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

  const words = name.split(' ').map(capitalize);

  let firstName: string;
  let lastName: string;
  let middleName: string;

  if (!includeMiddleNameInFirst) {
    firstName = words[0];
    lastName = words[words.length - 1];
    middleName = words.slice(1, words.length - 1).join(' ');
  } else {
    firstName = words.slice(0, words.length - 1).join(' ');
    lastName = words[words.length - 1];
    middleName = words.slice(1, words.length - 1).join(' ');
  }

  return {
    firstName,
    lastName,
    fullName: words.join(' '),
    middleName
  };
}

export function getInitials(name: string): string {
  const { firstName, lastName } = splitName(name);
  const firstInitial = firstName ? firstName[0] : '';
  const lastInitial = lastName ? lastName[0] : '';
  return `${firstInitial}${lastInitial}`.toUpperCase();
}
