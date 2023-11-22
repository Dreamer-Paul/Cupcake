declare namespace API {
  namespace Note {
    enum NoteType {
      Private,
      Friends,
      Limited,
      Public,
    }
    
    interface INoteMusic {
      id: number;
      type?: "netease";
      title: string;
      artist: string;
      album: string;
      cover: string;
    }
    
    interface INoteQuery {
      page: number;
      year?: number;
      month?: number;
      search?: string;
    }
    
    interface INoteDetailQuery {
      id: number;
      year?: number;
    }
    
    // 旧数据兼容
    interface INotePhotoData {
      year: number | string;
      name: string;
      type: string;
      url: string;
    }
    
    interface INoteData {
      id: number;
      title: string;
      content: string;
      except: string;
      content_html: string;
    
      date: string;
      mood: number;
      weather: number;
      status: number;
      type: NoteType;
      time_spent: number;
      music?: INoteMusic;
      starred: boolean;
      unlocked?: boolean;
    
      media: any[];
      photo?: INotePhotoData[];
    
      year?: string;
    
      time: number;
    
      likes: number;
    
      created_at: string;
      updated_at: string;
    }
  }
}
