
const Config = {
  s3: {
    REGION: "YOUR_S3_UPLOADS_BUCKET_REGION",
    BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME"
  },
  apiGateway: {
    REGION: "ap-south-1",
    dataUrl: "YOUR_API_URL",
    BASE_URL: 'YOUR_BASE_URL',
  },
  cognito: {
    REGION: "ap-south-1",
    USER_POOL_ID: "YOUR_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "YOUR_COGNITO_CLIENT_ID",
    IDENTITY_POOL_ID: "YOUR_COGNITO_IDENTITY_POOL_ID"
  },
  pubsub: {
    REGION: "ap-south-1",
    MQTT_ID: "YOUR_AWS_MQTTID"
  },
  agora: {
    APP_ID: "YOUR_AGORA_APPID"
  },
  graphQL: {
    REGION: "ap-south-1",
    ENDPOINT: "YOUR_GRAPHQL_ENDPOINT"
  }
};
export default Config;
export const MESSAGE_BOX_SCROLL_DURATION = 400;
