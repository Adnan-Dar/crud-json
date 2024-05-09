import { z } from "zod";

//define a schema for the edit form
function validateeditform(data: any) {
  const schema = z.object({
    newName: z.string().min(1),
    newPrice: z.number().min(1),
    newCategory: z.string().min(1),
  });

  return schema.parse(data);
}

//define a schema for the add form
function validateaddform(data: any) {
  const schema = z.object({
    name: z.string().min(1),
    price: z.number().min(1),
    category: z.string().min(1),
  });

  return schema.parse(data);
}

export { validateeditform, validateaddform };
