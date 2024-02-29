import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { persistor, store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "../components/Layout";
import "@/styles/globals.css";
// import "@/styles/bootstrap.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import favicon from "../public/favicon.png";
import Head from "next/head";
import SGlogo from "@/public/assets/tag_line.png"
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SME-SG</title>
        <link rel="icon" type="image/png" href={favicon.src} />
        <meta name="description" content="Leading Management Consultancy Firm specializing in strategy, operations, and organizational transformation." />
        <meta name="keywords" content="management consultancy, strategy, operations, organizational transformation, business consulting" />
        <meta name="author" content="Strategic Gears Management Consultancy" />
        
        {/* Open Graph (OG) Tags */}
        <meta property="og:title" content="SME-SG: Your Management Consultancy Partner" />
        <meta property="og:description" content="Leading Management Consultancy Firm specializing in strategy, operations, and organizational transformation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://strategicgears.com/" />
        <meta property="og:image" content="@/public/assets/tag_line.png" />
        {/* Replace the content of og:image with the URL of your company's logo or an appropriate image */}
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
