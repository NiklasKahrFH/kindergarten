export interface Kindergarden {
    id: number;
    name: string;
    address: string;
    typ: Typ,
    img: string;
    description: string;
  }

  export enum Typ {
      privat = 1,
      oeffentlich = 2,
  }