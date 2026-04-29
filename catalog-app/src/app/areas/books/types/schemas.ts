import { z} from 'zod';



export const BookApiCreateSchema = z.object({
    title: z.string(),
    author: z.string(),
    yearReleased: z.number().min(1900),

})

export const BookApiItemSchema = BookApiCreateSchema.extend({
    id: z.string()
})

export const BookApiItemsSchema = z.array(BookApiItemSchema)


export type BookApiItem = z.infer<typeof BookApiItemSchema>;

export type BookCreateItem = Omit<BookApiItem, 'id'>