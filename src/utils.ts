export function makeImagePath(id: string, format?: string) {
  return id
    ? `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`
    : `https://t1.daumcdn.net/cfile/blog/145C3C374E1EC49127`;
}
