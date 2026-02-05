export const TYPE_STRING: string = 'string' as const;

export const isString = (value: unknown): value is string => typeof value === TYPE_STRING;