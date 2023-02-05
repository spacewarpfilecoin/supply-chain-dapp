import Login from "@layouts/components/login";
import CreateOrder from "@layouts/components/CreateOrder";
import ConfirmOrder from "@layouts/components/ConfirmOrder";
import UpdateOrder from "@layouts/components/UpdateOrder"


export default function Home() {
 

  return (
    <div>
      <Login />
      <CreateOrder />
      <UpdateOrder />
      <ConfirmOrder />
    </div>
    )
}