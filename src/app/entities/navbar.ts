export class NavBar {
    Home: string;
    Qualification: string;
    Contact: string;
    Portfolio: string;
    Skills: string;
    Lamp: string;
    Idiom: string;

    constructor(home:string ="Home", qualification:string = "Qualification", contact:string = "Contact", portfolio:string = "Portfolio", skills:string = "Skills", lamp: string = "Lamp", idiom: string = "Idiom") {
        this.Home = home;
        this.Qualification = qualification;
        this.Contact = contact;
        this.Portfolio = portfolio;
        this.Skills = skills;
        this.Lamp = lamp;
        this.Idiom = idiom;
    }
}