/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { PersonaPropertyType } from './constants';

export type AllowedEnumValues = readonly string[] | readonly number[];

export interface CommonProperty<Type extends PersonaPropertyType> {
  /** A description of the property, useful for a better model output */
  description?: string;
  /** The type of the property to be expected */
  type: Type;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Property<T = any> =
  | StringProperty
  | NumberProperty
  | BooleanProperty
  | ObjectProperty
  | ArrayProperty
  | EnumProperty<T extends AllowedEnumValues ? T : never>;

export interface StringProperty
  extends CommonProperty<typeof PersonaPropertyType.STRING> {}

export interface NumberProperty
  extends CommonProperty<typeof PersonaPropertyType.NUMBER> {}

export interface BooleanProperty
  extends CommonProperty<typeof PersonaPropertyType.BOOLEAN> {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ObjectProperty<T = any>
  extends CommonProperty<typeof PersonaPropertyType.OBJECT> {
  /** The properties of the defined object */
  properties: Record<string, Property<T>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ArrayProperty<T = any>
  extends CommonProperty<typeof PersonaPropertyType.ARRAY> {
  /** The type of the items in the array */
  items: Property<T>;
}

export interface EnumProperty<Values extends AllowedEnumValues>
  extends CommonProperty<typeof PersonaPropertyType.ENUM> {
  /** The possible values of the enum */
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
