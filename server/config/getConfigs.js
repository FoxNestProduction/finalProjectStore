const GlobalConfig = require("../models/GlobalConfig");

module.exports = async () => {
  const configs = await GlobalConfig.findOne({ customId: "eatly-global-configs" });
  return configs;
};
