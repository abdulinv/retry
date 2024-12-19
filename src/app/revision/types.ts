export interface Rev {
  [key:string]:string | number
  name: string;
  count: number;
  priority: number;
}

export interface RevDocs {
  id: string;
  doc: Rev;
}
