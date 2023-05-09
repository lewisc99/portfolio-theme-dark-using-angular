export interface PortfolioDetail {
    id:string,
    subId:string,
    title:string,
    text:string,
    youtubeSrc:string,
    github:Github,
    site:Site,
    technologies: string[]
}

export interface Github {
    href:string,
    active:boolean
}

export interface Site {
    href:string,
    active:boolean
}
