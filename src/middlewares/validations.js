export const validateData = (schema, object) => schema.safeParse(object)

export const validatePartialData = (schema, object) =>
  schema.partial().safeParse(object)
