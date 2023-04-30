interface Qualification {
    id:number,
    title:string,
    dateStart:string,
    dateFinish:string,
    totalTime:string
    src:string
    detail: QualificationDetail
}

interface QualificationDetail {
    title: string,
    subTitle:string,
    selected:boolean,
    text:string,
    skills: QualificationSkills[]
}
interface QualificationSkills {
    title:string,
    src:string
}

interface Portfolio 
{
    id:string,
    title:string,
    subtitle:string,
    src:string,
    href:string,
    show: boolean
}

interface Skills 
{
    title: string;
    src:string;
}