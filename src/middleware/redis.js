const redis = require("redis");
const client = redis.createClient();
const helper = require("../helper/index");
const { request, response } = require("express");

module.exports = {
  getProductRedis: (request, response, next) => {
    let { page, limit } = request.query;
    client.get(`getProduct,page:${page},limit:${limit}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          response,
          200,
          "Get Product Redis Success",
          JSON.parse(result)
        );
      } else {
        next();
      }
    });
  },
  getCategoryRedis: (request, response, next) => {
    client.get(`getCategory`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          response,
          200,
          "Get Category Redis Success",
          JSON.parse(result)
        );
      } else {
        next();
      }
    });
  },
  clearDataProductRedis: (request, response, next) => {
    client.keys("getProduct*", (err, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },
  clearDataCategoryRedis: (request, response, next) => {
    client.keys("getCategory*", (err, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },
};
