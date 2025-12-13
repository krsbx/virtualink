export const PersonaPropertyType = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  OBJECT: 'object',
  ARRAY: 'array',
  ENUM: 'enum',
} as const;

export type PersonaPropertyType =
  (typeof PersonaPropertyType)[keyof typeof PersonaPropertyType];
