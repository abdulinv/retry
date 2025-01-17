export interface Question{
    [key:string]:string |string[]
    testName:string,
    qtext:string,
    answer:string,
    options:string[],
    date:string
}

export interface QuestionDoc{
    id:string,
    doc:Question
}

export interface TestListItem{
    [key:string]:string | number
    stack:string;
    testNumber:number;
}
export interface TestListDoc{
    id:string,
    doc:TestListItem
}