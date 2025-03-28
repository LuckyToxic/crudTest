export interface News {
    id: string
    title:string
    content: string
    date:string
    image: string
}

export type NewsWithoutId = Omit<News, 'id'>