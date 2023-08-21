export interface Qualification {
  id: number;
  title: string;
  dateStart: string;
  dateFinish: string;
  totalTime: string;
  src: string;
  detail: QualificationDetail;
}

export interface QualificationDetail {
  id: number;
  title: string;
  subTitle: string;
  selected: boolean;
  text: string;
  skills: QualificationSkills[];
}
export interface QualificationSkills {
  title: string;
  src: string;
}

export interface Portfolio {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  href: string;
  show: boolean;
}

export interface Skills {
  title: string;
  src: string;
}
