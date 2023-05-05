import { domainContact, persistanceContact } from '../../types/Contact';

class ContactMapper {
  toPersistance(domainContact: domainContact): persistanceContact {
    return {
      name: domainContact.name,
      phone: domainContact.phone,
      email: domainContact.email,
      category_id: domainContact.categoryId,
    };
  }

  toDomain(persistanceContact: persistanceContact): domainContact {
    return {
      id: persistanceContact.id,
      name: persistanceContact.name,
      phone: persistanceContact.phone,
      email: persistanceContact.email,
      categoryId: persistanceContact.category_id,
      categoryName: persistanceContact.category_name,
    };
  }
}

export default new ContactMapper();
