package service

import (
	"github.com/drawiin/full-cycle/goapi/internal/database"
	"github.com/drawiin/full-cycle/goapi/internal/entity"
)

type CategoryService struct {
	CategortegoryDB *database.CategoryDB
}

func NewCategoryService(categoryDB *database.CategoryDB) *CategoryService {
	return &CategoryService{CategortegoryDB: categoryDB}
}

func (cs *CategoryService) GetCategories() ([]*entity.Category, error) {
	categories, err := cs.CategortegoryDB.GetCategories()
	if err != nil {
		return nil, err
	}
	return categories, nil
}

func (cs *CategoryService) CreateCategory(name, description string) (*entity.Category, error) {
	category := entity.NewCategory(name, description)
	id, err := cs.CategortegoryDB.CreateCategory(category)
	if err != nil {
		return nil, err
	}
	category.ID = id
	return category, nil
}

func (cs *CategoryService) GetCategory(id string) (*entity.Category, error) {
	category, err := cs.CategortegoryDB.GetCategory(id)
	if err != nil {
		return nil, err
	}
	return category, nil
}
