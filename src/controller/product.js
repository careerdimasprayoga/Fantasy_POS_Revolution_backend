const {
  getProduct,
  searchProduct,
  getProductOrderName,
  getProductOrderCategory,
  getProductOrderDate,
  getProductOrderPrice,
  getProductCount,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
  getTotalProducts,
} = require("../model/product");
const qs = require("querystring");
const helper = require("../helper/index.js");
const redis = require("redis");
const client = redis.createClient();
const fs = require("fs");

const getPrevLink = (page, currentQuery) => {
  if (page > 1) {
    const generatedPage = {
      page: page - 1,
    };
    const resultPrevLink = { ...currentQuery, ...generatedPage };
    return qs.stringify(resultPrevLink);
  } else {
    return null;
  }
};
const getNextLink = (page, totalPage, currentQuery) => {
  if (page < totalPage) {
    const generatedPage = {
      page: page + 1,
    };
    const resultNextLink = { ...currentQuery, ...generatedPage };
    return qs.stringify(resultNextLink);
  } else {
    return null;
  }
};

module.exports = {
  getAllProduct: async (request, response) => {
    let { page, limit, sort } = request.query;
    page = parseInt(page);
    limit = parseInt(limit);
    let totalData = await getProductCount();
    let totalPage = Math.ceil(totalData / limit);
    let offset = page * limit - limit;
    let prevLink = getPrevLink(page, request.query);
    let nextLink = getNextLink(page, totalPage, request.query);
    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3009/product?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3009/product?${nextLink}`,
    };
    if (sort === undefined || sort === "") {
      sort = "id";
    }
    try {
      const result = await getProduct(limit, offset, sort);
      client.setex(
        `getProduct,page:${page},limit:${limit}`,
        3600,
        JSON.stringify(result)
      );
      return helper.response(
        response,
        200,
        "Get Product Success",
        result,
        pageInfo
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  searchProduct: async (request, response) => {
    try {
      const { search } = request.query;
      const result = await searchProduct(search);
      return helper.response(response, 200, "Search Product Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getTotalProducts: async (request, response) => {
    try {
      const result = await getTotalProducts();
      return helper.response(
        response,
        200,
        "Get total product success",
        result
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getProductOrderName: async (request, response) => {
    let { page, limit } = request.query;
    page = parseInt(page);
    limit = parseInt(limit);
    let totalData = await getProductCount();
    let totalPage = Math.ceil(totalData / limit);
    let offset = page * limit - limit;
    let prevLink = getPrevLink(page, request.query);
    let nextLink = getNextLink(page, totalPage, request.query);
    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3002/product?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3002/product?${nextLink}`,
    };
    try {
      const result = await getProductOrderName(limit, offset);
      return helper.response(
        response,
        200,
        "Get Product Success",
        result,
        pageInfo
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getProductOrderCategory: async (request, response) => {
    let { page, limit } = request.query;
    page = parseInt(page);
    limit = parseInt(limit);
    let totalData = await getProductCount();
    let totalPage = Math.ceil(totalData / limit);
    let offset = page * limit - limit;
    let prevLink = getPrevLink(page, request.query);
    let nextLink = getNextLink(page, totalPage, request.query);
    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3002/product?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3002/product?${nextLink}`,
    };
    try {
      const result = await getProductOrderCategory(limit, offset);
      return helper.response(
        response,
        200,
        "Get Product Success",
        result,
        pageInfo
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getProductOrderDate: async (request, response) => {
    let { page, limit } = request.query;
    page = parseInt(page);
    limit = parseInt(limit);
    let totalData = await getProductCount();
    let totalPage = Math.ceil(totalData / limit);
    let offset = page * limit - limit;
    let prevLink = getPrevLink(page, request.query);
    let nextLink = getNextLink(page, totalPage, request.query);
    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3002/product?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3002/product?${nextLink}`,
    };
    try {
      const result = await getProductOrderDate(limit, offset);
      return helper.response(
        response,
        200,
        "Get Product Success",
        result,
        pageInfo
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getProductOrderPrice: async (request, response) => {
    let { page, limit } = request.query;
    page = parseInt(page);
    limit = parseInt(limit);
    let totalData = await getProductCount();
    let totalPage = Math.ceil(totalData / limit);
    let offset = page * limit - limit;
    let prevLink = getPrevLink(page, request.query);
    let nextLink = getNextLink(page, totalPage, request.query);
    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3002/product?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3002/product?${nextLink}`,
    };
    try {
      const result = await getProductOrderPrice(limit, offset);
      return helper.response(
        response,
        200,
        "Get Product Success",
        result,
        pageInfo
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getProductById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getProductById(id);
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Get Product by ID Success",
          result
        );
      } else {
        return helper.response(response, 404, "Product not found !");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postProduct: async (request, response) => {
    if (!request.file) {
      return helper.response(response, 400, "Image required");
    }
    try {
      const setData = {
        id_category: request.body.id_category,
        name: request.body.name,
        image: request.file === undefined ? "no image" : request.file.filename,
        price: request.body.price,
        created: new Date(),
        status: request.body.status,
      };
      const result = await postProduct(setData);
      return helper.response(response, 201, "Product Created", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  patchProduct: async (request, response) => {
    try {
      const { id } = request.params;
      const { name, price, id_category, status } = request.body;
      const id_product = await getProductById(id);

      const setData = {
        name: name,
        image: !request.file ? id_product[0].image : request.file.filename,
        price: price,
        id_category: id_category,
        updated: new Date(),
        status: status,
      };

      if (setData.name === "") {
        return helper.response(response, 400, "Name required");
      } else if (setData.price === "") {
        return helper.response(response, 400, "Price required");
      } else if (setData.id_category === "") {
        return helper.response(response, 400, "Category required");
      } else if (setData.status === "") {
        return helper.response(response, 400, "Status required");
      }

      if (id_product.length > 0) {
        const result = await patchProduct(setData, id);
        return helper.response(response, 200, "Update Product Success", result);
      } else {
        return helper.response(response, 404, "Product not found");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const { id } = request.params;
      const id_product = await getProductById(id);
      fs.unlink(`./uploads/${id_product[0].image}`, async (error) => {
        if (error) {
          throw error;
        } else {
          const result = await deleteProduct(id);
          return helper.response(response, 201, "Product Deleted", result);
        }
      });
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
