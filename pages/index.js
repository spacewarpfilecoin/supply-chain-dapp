import Login from "pages/login";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import CreateOrder from "./create-order";
import UpdateTracker from "./update-order";
import ConfirmOrder from "./confirm-order";
import OrdersOverview from "./orders-overview";

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    //TODO add a localstorage check for metamask to only allow the other routes when user is logged in
    <div>
      <div>
        {isConnected ? (
          <>
            <OrdersOverview />
            <CreateOrder />
            <UpdateTracker />
            <ConfirmOrder />
          </>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}
