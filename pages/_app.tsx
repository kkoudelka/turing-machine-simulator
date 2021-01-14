import React from 'react';
import { AppContextProvider } from '../src/contexts/app-context';
import App from 'next/app';
import { MainLayout } from '../components/layout';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';

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
          <title>Turing Machine Simulator</title>
          <link rel="stylesheet" href="/main.css" />
        </Head>
        <noscript>This app requieres JavaScript to run!</noscript>
        <AppContextProvider>
          <SnackbarProvider>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </SnackbarProvider>
        </AppContextProvider>
      </>
    );
  }
}

export default TMSimApp;
