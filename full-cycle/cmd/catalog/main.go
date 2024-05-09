package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/drawiin/full-cycle/goapi/internal/database"
	"github.com/drawiin/full-cycle/goapi/internal/service"
	"github.com/drawiin/full-cycle/goapi/internal/webserver"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	_"github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/fullcycle")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	categoryDB := database.NewCategoryDB(db)
	categoryService := service.NewCategoryService(&categoryDB) // Pass the address of categoryDB

	productDB := database.NewProductDB(db)
	productService := service.NewProductService(&productDB)
	

	webCategoryHandler := webserver.NewCategoryHandler(categoryService)
	webProductHandler := webserver.NewWebProductHandler(productService)

	c := chi.NewRouter()
	c.Use(middleware.Logger)
	c.Use(middleware.Recoverer)
	c.Get("/category/{id}", webCategoryHandler.GetCategory)
	c.Get("/categories", webCategoryHandler.GetCategories)
	c.Post("/category", webCategoryHandler.CreateCategory)

	c.Get("/product/{id}", webProductHandler.GetProduct)
	c.Get("/products", webProductHandler.GetProducts)
	c.Get("/products/category/{categoryId}}", webProductHandler.GetProductByCategoryId)
	c.Post("/product", webProductHandler.CreateProduct)

	fmt.Println("Server is running at :8080")
	http.ListenAndServe(":8080", c)
}