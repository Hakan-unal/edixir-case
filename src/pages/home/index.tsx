import {
  Col,
  Row,
  Table,
  Drawer,
  Space,
  Tooltip,
  Button,
  Form,
  Input,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { showNotification } from "../../components/general/notification";
import { BsPencil } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlineUserPlus } from "react-icons/hi2";
import {
  handlePost,
  handleUpdate,
  handleGetAllUser,
  handleDelete,
} from "./service";

const Home = (props: any) => {
  const [isOpenCreateDrawer, setIsOpenCreateDrawer] = useState<boolean>(false);
  const [isOpenEditDrawer, setIsOpenEditDrawer] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState({});

  const [tableData, setTableData] = useState([]);
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      showSorterTooltip: { target: "full-header" },
      sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
      showSorterTooltip: { target: "full-header" },
      sorter: (a: any, b: any) => a.name.length - b.name.length,
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        {
          text: "Admin",
          value: "Admin",
        },
        {
          text: "Editor",
          value: "Editor",
        },
        {
          text: "Viewer",
          value: "Viewer",
        },
      ],
      onFilter: (value: any, record: any) =>
        record.role.indexOf(value as string) === 0,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Düzenle" color={"blue"}>
            <BsPencil
              onClick={() => handleEditDrawer(record)}
              className="cursorPointer"
              size={16}
              color="blue"
            />
          </Tooltip>

          <Tooltip title="Sil" color={"red"}>
            <FiTrash2
              onClick={() => handleDeleteUser(record.id)}
              className="cursorPointer"
              size={16}
              color="red"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleEditDrawer = (obj?: any) => {
    editForm.setFieldsValue(obj);
    setCurrentData(obj);
    setIsOpenEditDrawer(!isOpenEditDrawer);
  };
  const handleCreateDrawer = () => {
    setIsOpenCreateDrawer(!isOpenCreateDrawer);
    createForm.resetFields();
  };

  const handleDeleteUser = (ID: number) => {
    showNotification(
      "success",
      "Başarılı",
      ID + " id'li Kullanıcı Silindi",
      null
    );
    handleDelete(ID);
    refreshTableData();
  };

  const onFinishCreateForm = (values: any) => {
    showNotification("success", "Başarılı", "Kullanıcı Oluşturuldu", null);
    handlePost(values);
    refreshTableData();
    handleCreateDrawer();
  };

  const onFinishFailedCreateForm = (errorInfo: any) => {
    showNotification("error", "Başarısız", "Zorunlu Alanları Doldurun", null);
  };

  const onFinishEditForm = (values: any) => {
    showNotification("success", "Başarılı", "Kullanıcı Güncellendi", null);
    handleUpdate({
      ...currentData,
      ...values,
    });
    refreshTableData();
    handleEditDrawer();
  };

  const onFinishFailedEditForm = (errorInfo: any) => {
    showNotification("error", "Başarısız", "Zorunlu Alanları Doldurun", null);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const refreshTableData = () => {
    const tableData = handleGetAllUser();
    setTableData(tableData);
  };

  useEffect(() => {
    refreshTableData();
  }, []);

  return (
    <Row gutter={[12, 36]} className="cursorPointer">
      <Col>
        <Button size="middle" onClick={handleCreateDrawer}>
          {" "}
          Create New User <HiOutlineUserPlus size={20} />
        </Button>
      </Col>
      <Col span={24}>
        <Table size="large" dataSource={tableData} columns={columns as any} />
      </Col>

      {/**
       * Create drawer
       */}
      <Drawer
        size="large"
        title="Create Form for New User"
        open={isOpenCreateDrawer}
        onClose={handleCreateDrawer}
      >
        <Form
          form={createForm}
          name="basic"
          onFinish={onFinishCreateForm}
          onFinishFailed={onFinishFailedCreateForm}
          autoComplete="off"
          labelAlign="left"
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="Surname"
            name="surname"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input allowClear />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Select
              onChange={handleChange}
              options={[
                { value: "Admin", label: "Admin" },
                { value: "Viewer", label: "Viewer" },
                { value: "Editor", label: "Editor" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button className="button-radius" block htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      {/**
       * Edit drawer
       */}
      <Drawer
        size="large"
        title="Edit Form for Current User"
        open={isOpenEditDrawer}
        onClose={handleEditDrawer}
      >
        <Form
          form={editForm}
          name="basic"
          onFinish={onFinishEditForm}
          onFinishFailed={onFinishFailedEditForm}
          autoComplete="off"
          labelAlign="left"
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="Surname"
            name="surname"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input allowClear />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Select
              onChange={handleChange}
              options={[
                { value: "Admin", label: "Admin" },
                { value: "Viewer", label: "Viewer" },
                { value: "Editor", label: "Editor" },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button className="button-radius" block htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Row>
  );
};

export default Home;
