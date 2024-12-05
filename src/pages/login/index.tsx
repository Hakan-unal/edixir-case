import { Card, Form, Input, Button, Row, Col, Tooltip } from "antd";
import useLocalStorage from "../../hooks/useLocalStorage";
import mockUser from "../../staticData/user.json";
import { showNotification } from "../../components/general/notification";
import { navigator } from "../../components/general/navigator";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";

const Login = (props: any) => {
  const [user, setUser] = useLocalStorage<any>("user", {});
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    setUser(mockUser);

    showNotification(
      "success",
      "Başarılı",
      "Login oldunuz hoşgeldin: " + values.username,
      null
    );
    navigator(navigate, "/");
  };

  const onFinishFailed = (errorInfo: any) => {
    showNotification(
      "error",
      "Başarısız",
      "Login sürecinde hatayla karşılaşıldı",
      null
    );
  };
  return (
    <Row>
      <Col span={16} md={{ span: 12, offset: 6 }}>
        <Card hoverable>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ md: { span: 14, offset: 6 } }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            labelAlign="left"
          >
            <Tooltip title="Username: admin">
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input defaultValue={""} addonBefore={<CiUser />} allowClear />
              </Form.Item>
            </Tooltip>
            <Tooltip title="Password: admin">
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password addonBefore={<IoKeyOutline />} allowClear />
              </Form.Item>
            </Tooltip>

            <Form.Item wrapperCol={{ md: { span: 14, offset: 10 } }}>
              <Button
                className="button-radius"
                block
                type="primary"
                htmlType="submit"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
