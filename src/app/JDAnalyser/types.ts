
interface Skills{
    name:string,
    count:number
}

export interface Jobs{
    [key:string]:string |Skills[]
    designation:string,
    skills:Skills[]
}

export interface JobsDocs{
    id:string;
    doc:Jobs;
}