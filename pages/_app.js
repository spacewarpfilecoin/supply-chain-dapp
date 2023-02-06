import config from "@config/config.json";
import theme from "@config/theme.json";
import Head from "next/head";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import "styles/style.scss";
import Navbar from "@layouts/components/Navbar";
import { useRouter } from "next/router";
import { Web3Modal } from "@web3modal/react";
import { providers } from "@web3modal/ethereum";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { useAccount, configureChains, createClient, WagmiConfig } from "wagmi";
import {
  filecoinHyperspace,
  filecoin,
  arbitrum,
  avalanche,
  mainnet,
  polygon,
} from "wagmi/chains";

// 1. Get projectID at https://cloud.walletconnect.com
const projectId = "2892f3de6fb5f15454a2d35f67737e2b";

// 2. Configure wagmi client
const chains = [filecoinHyperspace];

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    version: "1",
    appName: "web3Modal",
    chains,
    projectId,
  }),
  provider,
});

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains);

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoen

const App = ({ Component, pageProps }) => {
  // default theme setup
  const { address, isConnected } = useAccount();
  const route = useRouter();
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

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <WagmiConfig client={wagmiClient}>
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
          {isConnected ? (
            <header>
              {/**Navbar Section*/}
              {route.pathname === "/" || "/orders-overview" ? null : <Navbar />}
            </header>
          ) : null}

          <Component {...pageProps} />

          {/**WalletConnect 
      <Web3Modal config={modalConfig} />**/}
        </WagmiConfig>
      ) : null}

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

export default App;
