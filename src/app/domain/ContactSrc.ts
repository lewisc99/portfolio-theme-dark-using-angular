
class ContactSrc {
    linkedin = "../assets/images/contact/icon-linkedin-light.svg";
    arroba = "../assets/images/contact/icon-arroba-light.svg";
    github ="../assets/images/contact/icon-github-light.svg";
    whatsapp = "../assets/images/contact/icon-whatsapp-light.svg";
  
    public toggleTheme(theme:string = "light"):void
    {
       if (theme == "dark")
       {
      
        this.linkedin = this.linkedin!.replace("dark","light");
        this.github = this.github!.replace("dark","light");
        this.whatsapp = this.whatsapp!.replace("dark","light");
        this.arroba = this.arroba!.replace("dark","light");
       } else {
        this.linkedin = this.linkedin!.replace("light","dark");
        this.arroba = this.arroba!.replace("light","dark");
        this.github = this.github!.replace("light","dark");
        this.whatsapp = this.whatsapp!.replace("light","dark");
       }
    }
  }