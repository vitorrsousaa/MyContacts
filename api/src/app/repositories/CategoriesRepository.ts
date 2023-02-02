import { v4 as uuidv4 } from 'uuid';

const categories = [
  {
    id: uuidv4(),
    name: 'Faculdade',
  },
  {
    id: uuidv4(),
    name: 'Discord',
  },
  {
    id: uuidv4(),
    name: 'Instagram',
  },
  {
    id: uuidv4(),
    name: 'Linkedin',
  },
];

class CategoriesRepository {
  create(name: string) {
    return new Promise((resolve) => {
      const newCategory = {
        name,
        id: uuidv4(),
      };

      categories.push(newCategory);

      resolve(newCategory);
    });
  }

  findAll() {
    return new Promise((resolve) => resolve(categories));
  }
}

export default new CategoriesRepository();
