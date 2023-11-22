declare namespace API {
  interface Response<D> {
    status: "Success" | "Failed";
    msg: string;
    data: D;
  }

  interface PageResponse<D> extends Response<D> {
    count: number;
  }
}
