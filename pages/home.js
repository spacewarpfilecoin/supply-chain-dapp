import Home from "@layouts/components/Home";
import Login from "pages/login";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import CreateOrder from "./create-order";

const HomePage = () => {
  const { address, isConnected } = useAccount();

  return <div>{isConnected ? <CreateOrder /> : <Login />}</div>;
};

export default HomePage;
