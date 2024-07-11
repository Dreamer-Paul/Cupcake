declare namespace API {
  namespace Media {
    // 数据库本来的数据
    export interface IMediaBaseData {
      title: string
      origin_name: string
      content: string
      cate: number
      key: string
      hidden: boolean
      hidden_ref: boolean
      is_sensitive: boolean
      take_time: string
      modified: number | string // 文件修改时间
      starred: boolean
    }

    // 后端加的数据
    export interface IMediaExtraData extends IMediaBaseData {
      file_name: string
      type: string
      meta: unknown
      path: string

      likes: number
      created_at: string
      updated_at: string

      url: string
      thumb_url: string
    }

    export interface IMediaData extends IMediaExtraData {
      id: number
    }
  }
}
