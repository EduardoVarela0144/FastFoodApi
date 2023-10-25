const packageJson = require("../../package.json");
const cartRouter = require("../api/cart/cart.routes");
const imageRouter = require("../api/image/image.routes");
const productRouter = require("../api/product/product.routes");
const userRouter = require("../api/user/user.routes");
const API_V1 = "/ulsafoods";

module.exports = (app) => {
  app.get(API_V1, (req, res) => {
    res.json({ version: packageJson.version });
  });

  app.use(`${API_V1}/images`, imageRouter);
  app.use(`${API_V1}/carts`, cartRouter);
  app.use(`${API_V1}/products`, productRouter);
  app.use(`${API_V1}/users`, userRouter);
  app.use(`${API_V1}/images`, imageRouter);

};
