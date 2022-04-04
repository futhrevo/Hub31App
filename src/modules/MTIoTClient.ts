import mqtt from 'mqtt';
import { Signer, Credentials } from '@aws-amplify/core';
import config from './config';

// eslint-disable-next-line no-unused-vars
import { onConnect, onDisconnect, onError, newIOTMsg } from '../redux/iot/actions';

const SERVICE_NAME = 'iotdevicegateway';

// https://github.com/aws-amplify/amplify-js/issues/3039#issuecomment-599365164
// https://github.com/Dinesh5799/AWS_MQTT_IOT_Reconnect
export class MTIoTClient {
  private _client: mqtt.MqttClient | null;
  private _endpoint: string;
  private _signedUrl: string;
  private _subs: Set<string>;
  private _region: string;

  constructor(mqttID: string, region: string) {
    this._endpoint = `wss://${mqttID}.iot.${region}.amazonaws.com/mqtt`;
    this._signedUrl = `wss://${mqttID}.iot.${region}.amazonaws.com/mqtt`;
    this._subs = new Set(['room/public/hub31-iot-thing']);
    this._region = region;
    this._client = null;
  }

  async _signUrl() {
    const serviceInfo = {
      service: SERVICE_NAME,
      region: this._region,
    };
    const {
      accessKeyId: access_key,
      secretAccessKey: secret_key,
      sessionToken: session_token,
    } = await Credentials.get();

    this._signedUrl = Signer.signUrl(
      this._endpoint,
      { access_key, secret_key, session_token },
      serviceInfo
    );
  }

  async init(dispatch: any) {
    if (this._client != null) {
      if (this._client.connected) return;
      if (this._client.reconnecting) {
        this._client.end(true);
      }
    }
    let self = this;
    let client = mqtt.connect(this._endpoint, {
      reconnectPeriod: 1000,
      transformWsUrl: function (url, options, client) {
        self._signUrl();
        return self._signedUrl;
      }
    });

    client.on("connect", () => {
      console.log("Connected successfully");
      dispatch(onConnect());
      client.subscribe([...self._subs], err => {
        if (!err) {
          console.log("Subscribed successfully");
        } else {
          console.log(err);
        }
      });
    });
    client.on("message", (topic, message) => {
      dispatch(newIOTMsg(topic, message));
      // message = JSON.parse(message.toString());//By default it's returning a buffer stream so parsing it as I have to use some parameters got from message JSON.
    });
    client.on("error", (error) => {
      console.error(error);
    })
    this._client = client;
  }

  isConnected() {
    if (this._client === null) return false;
    return this._client.connected;
  }

  subscribe(topics: string | Array<string>) {
    if (!topics) return;
    if (typeof topics === 'string') {
      this._subs.add(topics);
    } else {
      if (topics.length === 0) return;
      topics.map(el => this._subs.add(el));
    }
    if (this.isConnected()) {
      this._client !== null &&
        this._client.subscribe(topics);
    }
  }

  publish(topic: string, message: string) {
    if (this.isConnected()) {
      this._client !== null &&
        this._client.publish(topic, message);
    }
  }

  unsubscribe(topics: string | Array<string>) {
    if (!topics) return;
    if (typeof topics === 'string') {
      this._subs.delete(topics);
    } else {
      if (topics.length === 0) return;
      topics.map(el => this._subs.delete(el));
    }
    if (this.isConnected()) {
      this._client !== null &&
        this._client.unsubscribe(topics);
    }
  }

  end(force: boolean) {
    if (this.isConnected()) {
      this._subs.clear();
      this._client !== null &&
        this._client.end(force, {}, () => { this._client = null });
    }
  }
}

export let iotClient = new MTIoTClient(config.pubsub.MQTT_ID, config.pubsub.REGION);

// READ: https://k94n.com/es6-modules-single-instance-pattern
// TODO: https://www.freecodecamp.org/forum/t/javascript-callback-functions-explained-how-to-use-callbacks-in-javascript/14658
