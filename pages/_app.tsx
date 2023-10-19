import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { persistor, store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "../components/Layout";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import { Cairo } from "next/font/google";
const inter = Cairo({ subsets: ["latin"] });
const cairo = Cairo({
  weight: "400",
  subsets: ["latin"],
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  );
}

export default MyApp;
