declare namespace API {
  namespace Page {
    interface IPageData {
      id: number
      title: string
      desc: string
      slug: string
      content: string
      hidden: boolean
      created_at: string
      updated_at: string
    }
  }
}
