// To adapt for usage with the database ORM
export class Product {
  id: string;
  name: string;
  ingredients: string;
  weightGramm?: number;
  volumeLiter?: number;
  priseBGN?: number;
  category: string;
  active: boolean;
  created: Date;
  updated: Date;
}

