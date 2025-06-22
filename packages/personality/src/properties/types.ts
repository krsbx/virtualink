import type { PersonaPropertyType } from './constants';

export type AllowedEnumValues = readonly string[] | readonly number[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Property<T = any> =
  | StringProperty
  | NumberProperty
  | BooleanProperty
  | ObjectProperty
  | ArrayProperty
  | EnumProperty<T extends AllowedEnumValues ? T : never>;

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
  items: Property<T> | Property<T>[];
}

export interface EnumProperty<Values extends AllowedEnumValues> {
  type: typeof PersonaPropertyType.Enum;
  values: Values;
}

export type ParseProperty<
  T extends Property,
  FixAutoComplete extends boolean = false,
> = T extends StringProperty
  ? FixAutoComplete extends true
    ? string & {}
    : string
  : T extends NumberProperty
    ? FixAutoComplete extends true
      ? number & {}
      : number
    : T extends BooleanProperty
      ? boolean
      : T extends EnumProperty<infer Values>
        ? Values[number]
        : T extends ObjectProperty
          ? {
              [K in keyof T['properties']]: ParseProperty<T['properties'][K]>;
            }
          : T extends ArrayProperty<infer Item>
            ? T['items'] extends Array<Property<Item>>
              ? ParseProperty<T['items'][number], true>[]
              : T['items'] extends Property<Item>
                ? ParseProperty<T['items']>[]
                : never
            : never;

export type ParseFullProperty<T extends Record<string, Property>> = {
  [K in keyof T]: ParseProperty<T[K]>;
};
