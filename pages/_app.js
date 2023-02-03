import config from "@config/config.json";
import theme from "@config/theme.json";
import Head from "next/head";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import "styles/style.scss";
import Navbar from "@layouts/components/Navbar";
import { useRouter } from "next/router";
import { Web3Modal } from "@web3modal/react";
import { chains, providers } from "@web3modal/ethereum";

{/**WalletConnect 
const modalConfig = {
  theme: 'dark',
  accentColour: 'default',
  ethereum: {
    appName: 'spplychain Dapp',
    chains: [
      chains.goerli, chains.polygonMumbai
    ],
    provider: [
      providers.walletConnectProvider({
        projectId: '2892f3de6fb5f15454a2d35f67737e2b',
      })
    ],
    autoConnect: true,
  },
  projectId: '2892f3de6fb5f15454a2d35f67737e2b',
}; */}


const App = ({ Component, pageProps }) => {
  // default theme setup

  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  const [fontcss, setFontcss] = useState();
  useEffect(() => {
    fetch(
      `https://fonts.googleapis.com/css2?family=${pf}${
        sf ? "&family=" + sf : ""
      }&display=swap`
    ).then((res) => res.text().then((css) => setFontcss(css)));
  }, [pf, sf]);

  // google tag manager (gtm)
  const tagManagerArgs = {
    gtmId: config.params.tag_manager_id,
  };
  useEffect(() => {
    setTimeout(() => {
      process.env.NODE_ENV === "production" &&
        config.params.tag_manager_id &&
        TagManager.initialize(tagManagerArgs);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `${fontcss}`,
          }}
        />
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </Head>
      <header>

     {/**Navbar Section*/}
       <Navbar />
        </header>
        <Component {...pageProps} />

      {/**WalletConnect 
      <Web3Modal config={modalConfig} />**/}
    </>
  );
};

export default App;
