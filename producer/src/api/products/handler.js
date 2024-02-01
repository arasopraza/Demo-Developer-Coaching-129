class ProductsHandler {
  constructor(service) {
    this._service = service;

    this.postProductHandler = this.postProductHandler.bind(this);
    this.getProductsHandler = this.getProductsHandler.bind(this);
  }

  async postProductHandler(request, h) {
    const { name, description, category, price, brand } = request.payload;

    const product = await this._service.addProduct({ name, description, category, price, brand });

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
    const products = await this._service.getAllProducts();
    return {
      status: 'success',
      data: {
        products,
      },
    };
  }
}

module.exports = ProductsHandler;