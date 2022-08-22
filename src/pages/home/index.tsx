import React, { useState, useCallback, useMemo } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import menu from "./menu";
import styles from "./index.less";

const { Header, Sider, Content } = Layout;

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const initIndex = useMemo(() => {
    return (
      menu.find((menuItem) => menuItem.path === pathname)?.key || menu[0]?.key
    );
  }, [pathname]);

  const handleMenuChange = useCallback(({ key }: { key: string }) => {
    let chooseItem = menu.find((item) => item.key === key);
    if (chooseItem?.path) navigate(chooseItem.path);
  }, []);

  return (
    <Layout className={styles.container}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo}></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[initIndex]}
          items={menu}
          onSelect={handleMenuChange}
        />
      </Sider>
      <Layout className={styles.rightLayout}>
        <Header className={styles.header}>
          {collapsed ? (
            <MenuUnfoldOutlined onClick={() => setCollapsed(false)} />
          ) : (
            <MenuFoldOutlined onClick={() => setCollapsed(true)} />
          )}
        </Header>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
