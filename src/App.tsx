
import { Layout, theme } from "antd"
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/home"
import Login from "./pages/login"

import page404 from "./pages/404"
import Sidebar from './components/layout/sidebar';
import useLocalStorage from "./hooks/useLocalStorage"
import { useEffect } from "react";
import { navigator } from "./components/general/navigator";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const App: React.FC = () => {
  const [user, setUser] = useLocalStorage<any>("user", null)
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (!user?.accessToken) navigator(navigate, "/login")
  }, [user])

  return (<Layout >
    <Layout>


      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 500,
          background: colorBgContainer,
        }}
      >
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/login" Component={Login}></Route>

          <Route path="*" Component={page404}></Route>
        </Routes>

      </Content>
      
    </Layout>
    <Sidebar />

  </Layout>

  )
}


export default App;
