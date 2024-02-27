import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { persistor, store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "../components/Layout";
import "@/styles/globals.css";
// import "@/styles/bootstrap.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import { Cairo } from "next/font/google";
import favicon from "../public/favicon.png";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SME-SG</title>
        <link rel="icon" type="image/png" href={favicon.src} />
      </Head>
      <div>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {() => (
              <div>
                <ToastContainer />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </div>
            )}
          </PersistGate>
        </Provider>
      </div>
    </>
  );
}

export default MyApp;
