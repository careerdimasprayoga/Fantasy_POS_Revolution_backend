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
  sortProduct,
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
  sortProduct: async (request, response) => {
    try {
      const { sort } = request.query;
      let varSort = "";
      if (sort === undefined || sort === "") {
        varSort = "id";
      } else if (sort === "category") {
        varSort = "id_category";
      } else if (sort === "nameASC") {
        varSort = "name asc";
      } else if (sort === "nameDESC") {
        varSort = "name desc";
      } else if (sort === "oldest") {
        varSort = "created desc";
      } else if (sort === "newest") {
        varSort = "created asc";
      } else if (sort === "lowest") {
        varSort = "price asc";
      } else if (sort === "highest") {
        varSort = "price desc";
      }
      console.log(varSort);
      const result = await sortProduct(varSort);
      return helper.response(response, 200, "Sort Product Success", result);
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
    try {
      if (!request.file) {
        console.log("image");
        return helper.response(response, 400, "Image required");
      }
      let { id_category, name, price, status } = request.body;
      const setData = {
        id_category: id_category,
        name: name,
        image: request.file.filename,
        price: price,
        created: new Date(),
        status: status,
      };
      if (id_category === "") {
        return helper.response(response, 400, "Category required");
      } else if (name === "") {
        return helper.response(response, 400, "Name required");
      } else if (price === "") {
        return helper.response(response, 400, "Price required");
      } else if (status === "") {
        return helper.response(response, 400, "Status required");
      }
      const result = await postProduct(setData);
      return helper.response(response, 201, "Create Product success", result);
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
      if (id_product[0].image === "default.png") {
        const result = await deleteProduct(id);
        return helper.response(response, 201, "Product Deleted", result);
      } else if (
        id_product[0].image === undefined ||
        id_product[0].image === "" ||
        id_product[0].image === null
      ) {
        const result = await deleteProduct(id);
        return helper.response(response, 201, "Product Deleted", result);
      } else {
        fs.unlink(`./uploads/${id_product[0].image}`, async (error) => {
          if (error) {
            const result = await deleteProduct(id);
            return helper.response(response, 201, "Product Deleted", result);
            // throw error;
          } else {
            const result = await deleteProduct(id);
            return helper.response(response, 201, "Product Deleted", result);
          }
        });
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
