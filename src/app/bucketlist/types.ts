export interface Skill{
    name: string;
    priority: number;
}

export interface Bucket {
  [key: string]: Skill[];
  skills:Skill[]
 
}

export interface BucketDocs {
  id: string;
  doc: Bucket
}
