import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

export type MenuType = {
  key: string;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  path?: string;
};

const menu: MenuType[] = [
  {
    key: "profile",
    icon: <UserOutlined />,
    label: "profile",
    path: "/home/profile",
  },
  {
    key: "video",
    icon: <VideoCameraOutlined />,
    label: "video",
    path: "/home/video",
  },
  {
    key: "upload",
    icon: <UploadOutlined />,
    label: "upload",
    path: "/home/upload",
  },
];

export default menu;
