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
import favicon from "../public/favicon.ico"
import Head from "next/head";
const inter = Cairo({ subsets: ["latin"] });
const cairo = Cairo({
  weight: "400",
  subsets: ["latin"],
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
    <title>SME</title>
    <link rel="icon" type="image/png" href={favicon.src} />
    </Head>
    <div className={cairo.className}>
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
