export interface News {
    id: string
    title:string
    content: string
    date:string
}

export type NewsWithoutId = Omit<News, 'id'>