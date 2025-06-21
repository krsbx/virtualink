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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ArrayProperty<T = any> {
  type: typeof PersonaPropertyType.Array;
  items: Property<T>;
}

export interface EnumProperty<Values extends readonly string[]> {
  type: typeof PersonaPropertyType.Enum;
  values: Values;
}

export type ParseProperty<T extends Property> = T extends StringProperty
  ? string
  : T extends NumberProperty
    ? number
    : T extends BooleanProperty
      ? boolean
      : T extends EnumProperty<infer Values>
        ? Values[number]
        : T extends ObjectProperty
          ? {
              [K in keyof T['properties']]: ParseProperty<T['properties'][K]>;
            }
          : T extends ArrayProperty
            ? ParseProperty<T['items']>[]
            : never;

export type ParseFullProperty<T extends Record<string, Property>> = {
  [K in keyof T]: ParseProperty<T[K]>;
};
