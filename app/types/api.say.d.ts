declare namespace API {
  namespace Say {
    export interface ISayData {
      id: number
      author: string
      content: string
      origin: string
      link: string
      is_comment: boolean

      likes: number

      created_at: string | null
      updated_at: string | null
    }
  }
}
