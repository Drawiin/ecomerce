package service

import (
	"github.com/drawiin/full-cycle/goapi/internal/database"
	"github.com/drawiin/full-cycle/goapi/internal/entity"
)

type ProductService struct {
	ProductDB *database.ProductDB
}

func NewProductService(productDB *database.ProductDB) *ProductService {
	return &ProductService{ProductDB: productDB}
}

func (ps *ProductService) GetProducts() ([]*entity.Product, error) {
	products, err := ps.ProductDB.GetProducts()
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (ps *ProductService) GetProduct(id string) (*entity.Product, error) {
	product, err := ps.ProductDB.GetProduct(id)
	if err != nil {
		return nil, err
	}
	return product, nil
}

func (ps *ProductService) GetProductByCategoryId(categoryId string) ([]*entity.Product, error) {
	products, err := ps.ProductDB.GetProductByCategory(categoryId)
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (ps *ProductService) CreateProduct(name, description string, price float64, categoryID, imageURL string) (*entity.Product, error) {
	product := entity.NewProduct(name, description, price, categoryID, imageURL)
	_, err := ps.ProductDB.CreateProduct(product)
	if err != nil {
		return nil, err
	}
	return product, nil
}
