import type { PersonaPropertyType } from './constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Property<T = any> =
  | StringProperty
  | NumberProperty
  | BooleanProperty
  | ObjectProperty
  | ArrayProperty
  // @ts-expect-error Ignore the any type
  | EnumProperty<T>;

export interface StringProperty {
  type: typeof PersonaPropertyType.String;
}

export interface NumberProperty {
  type: typeof PersonaPropertyType.Number;
}

export interface BooleanProperty {
  type: typeof PersonaPropertyType.Boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ObjectProperty<T = any> {
  type: typeof PersonaPropertyType.Object;
  properties: Record<string, Property<T>>;
}

export interface ArrayProperty {
  type: typeof PersonaPropertyType.Array;
  items: Property;
}

export interface EnumProperty<Values extends readonly string[]> {
  type: typeof PersonaPropertyType.Enum;
  values: Values;
}
