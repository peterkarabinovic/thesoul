const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}


const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
//   {
//     resolve: `@medusajs/file-local`,
//     options: {
//       upload_dir: "uploads",
//     },
//   },
  {
    resolve: `medusa-file-s3`,
    options: {
      s3_url: "https://the-soul.s3.eu-central-1.amazonaws.com",
      bucket: "the-soul",
      region: "eu-central-1",
      access_key_id: process.env.AWS_ACCESS_KEY_ID,
      secret_access_key: process.env.AWS_SECRET_ACCESS_KEY
    }
  },
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
    //   autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
  {
    resolve: "medusa-novaposhta-fulfillment",
    options: {
      apiKey: process.env.NOVAPOSHTA_API_KEY
    }
  },
  {
    resolve: "medusa-auth-otp"
  }
];

const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-local"
  },
  /*
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },*/
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookie_secret: process.env.COOKIE_SECRET || "801f2d3c812e75306987a9617d4eba40dcac103ffa0d3f1b53b632d6dc054b96",
  store_cors: process.env.STORE_CORS,
  database_url: process.env.DATABASE_URL,
  admin_cors: process.env.STORE_CORS,
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
  featureFlags: {
    product_categories: true
  }
};
