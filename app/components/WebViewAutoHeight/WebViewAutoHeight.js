import React from 'react';
import { WebView } from 'react-native-webview';

export default class WebViewAutoHeight extends React.Component {
  state = {
    contentHeight: 500, //by some reason, this may not be 0 at the beginning
  };

  render() {
    const { source } = this.props;

    const runFirst = `
      const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1');
      meta.setAttribute('name', 'viewport');
      document.getElementsByTagName('head')[0].appendChild(meta);
      setTimeout(function() { window.ReactNativeWebView.postMessage(document.body.scrollHeight); }, 1000);
      true; // note: this is required, or you'll sometimes get silent failures
    `;
    return (
      <WebView
        originWhitelist={['*']}
        source={source}
        scalesPageToFit={true}
        injectedJavaScript={runFirst}
        onMessage={(event) => {
          console.log(event);
          this.setState({ contentHeight: parseInt(event.nativeEvent.data) });
        }}
        style={{ height: this.state.contentHeight }}
      />
    );
  }
}
