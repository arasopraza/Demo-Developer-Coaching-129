class ProductsHandler {
  constructor(productService, storageService) {
    this._productService = productService;
    this._storageService = storageService;

    this.postProductHandler = this.postProductHandler.bind(this);
    this.getProductsHandler = this.getProductsHandler.bind(this);
  }

  async postProductHandler(request, h) {
    const { name, description, category, price, brand, photo } = request.payload;
    
    const filename = await this._storageService.writeFile(photo, photo.hapi);
    const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`;
   
    const product = await this._productService.addProduct({ name, description, category, price, brand, photo: fileLocation });

    const response = h.response({
      status: 'success',
      message: 'Product berhasil ditambahkan',
      data: {
        product,
      },
    });
    response.code(201);
    return response;
  }

  async getProductsHandler(request, h) {
    const products = await this._productService.getAllProducts();
    return {
      status: 'success',
      data: {
        products,
      },
    };
  }
}

module.exports = ProductsHandler;