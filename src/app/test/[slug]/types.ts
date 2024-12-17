export interface Question{
    [key:string]:string |string[]
    testName:string,
    qtext:string,
    answer:string,
    options:string[]
}

export interface QuestionDoc{
    id:string,
    doc:Question
}