interface IBlogData {
  title: string
  image: string
  date: string
  link: string
  content: string
}

declare namespace API {
  namespace Sync {
    interface ISyncData {
      blog: IBlogData[]
      video: unknown[]
      note: API.Note.INoteData[]
      say: API.Say.ISayData[]
      media: API.Media.IMediaData[]
      music: API.Music.IMusicData[]
    }
  }
}
