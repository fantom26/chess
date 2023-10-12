const { langs } = require("@constants/shared/common");

const i18nConfig = {
  locales: langs,
  defaultLocale: "en",
  prefixDefault: "/",
  routingStrategy: "dynamicSegment"
};

module.exports = i18nConfig;
