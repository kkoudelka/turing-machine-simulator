import React from 'react';
import { AppContextProvider } from '../src/contexts/app-context';
import App from 'next/app';
import { MainLayout } from '../components/layout';
import Head from 'next/head';

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
        <Head>
          <link rel="stylesheet" href="/main.css" />
        </Head>
        <noscript>This app requieres JavaScript to run!</noscript>
        <AppContextProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </AppContextProvider>
      </>
    );
  }
}

export default TMSimApp;
