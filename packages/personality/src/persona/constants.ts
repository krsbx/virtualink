import type { Property } from '../properties/types';

export const DefaultPersonaOutput = {
  response: {
    type: 'string',
  },
} satisfies Record<string, Property>;

export type DefaultPersonaOutput = typeof DefaultPersonaOutput;

export const DefaultPersonaEmotions = [
  'positive',
  'negative',
  'neutral',
] as const;

export type DefaultPersonaEmotions = typeof DefaultPersonaEmotions;
