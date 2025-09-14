import Layout from "./components/default/Layout";
import PrivateRouter from "./components/default/router/PrivateRouter";
import HomePage from "./pages/HomePage";



const routes = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <PrivateRouter component={<HomePage />} /> },
    ],
  },
]

export default routes