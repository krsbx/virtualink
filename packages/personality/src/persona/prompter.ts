import { PersonaPropertyType } from '../properties/constants';
import type { AllowedEnumValues, Property } from '../properties/types';

export function propertyToPrompt(
  key: string,
  property: Property,
  padStartBy: number = 0
) {
  const basePadding = padStartBy + 2;
  const prompts: string[] = [`${' '.repeat(padStartBy)}- ${key.trim()}:`];

  if (property.description) {
    prompts[0] += ` ${property.description.trim()}`;
  }

  switch (property.type) {
    case PersonaPropertyType.STRING:
      prompts.push(`${' '.repeat(basePadding)}Write it as a string.`);
      break;

    case PersonaPropertyType.NUMBER:
      prompts.push(`${' '.repeat(basePadding)}Write it as a number.`);
      break;

    case PersonaPropertyType.BOOLEAN:
      prompts.push(`${' '.repeat(basePadding)}Write it as a boolean.`);
      break;

    case PersonaPropertyType.ENUM: {
      const values = (property.values as AllowedEnumValues).map((value) => {
        if (typeof value === 'string') {
          return `"value"`;
        }

        if (typeof value === 'number') {
          return value;
        }

        return JSON.stringify(value);
      });

      prompts.push(
        `${' '.repeat(basePadding)}Write it one of the following : ${values.join(', ')}`
      );
      break;
    }

    case PersonaPropertyType.OBJECT:
      prompts.push(
        `${' '.repeat(basePadding)}Write it as a JSON object with the following properties:`
      );

      for (const [key, value] of Object.entries(property.properties)) {
        prompts.push(propertyToPrompt(key.trim(), value, basePadding + 2));
      }
      break;

    case PersonaPropertyType.ARRAY: {
      const items = Array.isArray(property.items)
        ? property.items
        : [property.items];

      prompts.push(
        `${' '.repeat(basePadding)}Write it as an array with the following items:`
      );

      for (const [index, item] of items.entries()) {
        prompts.push(propertyToPrompt(index.toString(), item, basePadding + 2));
      }

      break;
    }

    default:
      throw new Error(`Unknown property type`);
  }

  prompts.forEach((_, id) => {
    const prompt = prompts[id];

    if (!prompt) return;

    prompts[id] = prompt.padStart(basePadding + 2, ' ');
  });

  return prompts.join('\n');
}
