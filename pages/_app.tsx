import React from 'react';
import { AppContextProvider } from '../src/contexts/app-context';
import App from 'next/app';

class TMSimApp extends App<{}> {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <noscript>This app requieres JavaScript to run!</noscript>
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </>
    );
  }
}

export default TMSimApp;
