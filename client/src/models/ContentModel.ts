export interface ContentModel {
  lang: string;
  title: string;
  description: string;
  href: string;
  nav: {
    about: string,
    work: string,
    services: string;
    btn: string;
  }
  index: {
    hero: THero,
    desc: string;
    mapTitle: string,
  },
  about: {
    hero: THero;
    desc: string;
    counterTitle: string;
    text: string[];
    whoWeAreTitle: string;
    leadsTitle: string;
    locationsTitle: string;
    locations: Array<{name: string, img: string}>
  }
  counters: Array<{title: string, value: number}>
  howSection: {
    title: string;
    list: Array<{title: string, desc: string, class: string}>
  }

  tech: {
    title: string;
    desc: string
  }

  services: {
    title: string;
  }

  form: {
    title: string;
    desc: string;
    fields: {
      name: string;
      email: string;
      phone: string;
      subj: string;
      textArea: string;
      fetchErr: string;
      sucMsg: string;
      loading: string;
      btnText: string;
    }
  }
}

type THero = {
  redline: string,
  title: string,
  btnText?: string,
}