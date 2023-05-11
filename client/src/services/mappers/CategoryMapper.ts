class CategoryMapper {
  toDomain(persistanceCategory: { id: string; name: string }) {
    return {
      id: persistanceCategory.id,
      name: persistanceCategory.name,
    };
  }
}

export default new CategoryMapper();
