import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Amplify from '@aws-amplify/core';
import { Provider } from 'react-redux';

import store from './redux/store';
import './index.css';
import App from './layouts/App';
import * as serviceWorker from './serviceWorker';
import './i18n';

import config from './modules/config';
const awsconfig = {
  Auth: {
    mdySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: 'baseurl',
        endpoint: config.apiGateway.BASE_URL,
        region: config.apiGateway.REGION
      },
    ]
  },
  "aws_appsync_graphqlEndpoint": config.graphQL.ENDPOINT,
  "aws_appsync_region": config.graphQL.REGION,
  "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
  "aws_appsync_apiKey": "null",
  // PubSub: {
  //   aws_pubsub_region: config.pubsub.REGION,
  //   aws_pubsub_endpoint: `wss://${config.pubsub.MQTT_ID}.iot.${config.pubsub.REGION}.amazonaws.com/mqtt`,
  // }
}
Amplify.configure(awsconfig);
// PubSub.configure(awsconfig);
// PubSub.addPluggable(new AWSIoTProvider());

// optional cofiguration
const alertOptions = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}


const Root = () => (

  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <React.Suspense fallback={<span>Loading...</span>}>
        <Router>
          <App />
        </Router>
      </React.Suspense>
    </AlertProvider>
  </Provider>

)

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
