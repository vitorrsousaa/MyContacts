export default interface Contact {
  name: string;
}

export interface ContactAPI {
  name: string;
  email: string;
  category_id: string;
  phone: string;
}

export interface domainContact {
  name: string;
  email: string;
  categoryId: string;
  categoryName?: string;
  phone: string;
  id?: string;
}

export interface persistanceContact {
  id?: string;
  name: string;
  email: string;
  category_id: string;
  category_name?: string;
  phone: string;
}
