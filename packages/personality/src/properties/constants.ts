export const PersonaPropertyType = {
  String: 'string',
  Number: 'number',
  Boolean: 'boolean',
  Object: 'object',
  Array: 'array',
  Enum: 'enum',
} as const;

export type PersonaPropertyType =
  (typeof PersonaPropertyType)[keyof typeof PersonaPropertyType];
