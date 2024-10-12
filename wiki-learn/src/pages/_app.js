import "@/styles/globals.css";
// import"@/styles/header.module.css";
import connectToDataBase from '@/../config/database'
export default function App({ Component, pageProps }) {
  connectToDataBase()
  return <Component {...pageProps} />;
}
