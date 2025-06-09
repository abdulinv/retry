
export interface Project{
   
    [key:string]:string|string[]
    title:string,
    description:string,
    tags:string[],
    clone_URL:string
}

export interface ProjectDocs {
  id: string;
  doc: Project;
}