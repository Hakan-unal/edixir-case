import { useEffect, useState } from "react";
import { Badge, Card, Divider, Typography, Image } from "antd";
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "antd";
import { FaRegTrashAlt } from "react-icons/fa";
import { CHANGED } from "../../../redux/constants";

const { Sider } = Layout;
const Sidebar: React.FC = (...props) => {
  const [basket, setBasket] = useState([]);
  const [total, setTotal] = useState<number>(0);

  const { Text } = Typography;

  const dispatch = useDispatch();
  const globalState: any = useSelector((state) => state);

  const removeBasket = (index: number) => {
    const tempArr: any = [...basket];
    tempArr.splice(index, 1);
    dispatch({
      type: CHANGED,
      state: { basket: tempArr },
    });
    setBasket(tempArr);
  };

  const handleTotal = () => {
    let tempTotal = 0;
    basket.forEach((obj: any) => {
      tempTotal += obj.price;
    });
    setTotal(tempTotal);
  };

  useEffect(() => {
    if (globalState.konzek) {
      setBasket(globalState.konzek.state.basket);
      handleTotal();
    }
  }, [globalState]);

  useEffect(() => {
    handleTotal();
  }, [basket]);

  const BasketItem = () => {
    return basket?.map((obj: any, index: number) => (
      <Card
        bordered={false}
        key={index}
        extra={
          <FaRegTrashAlt
            onClick={() => removeBasket(index)}
            style={{ cursor: "pointer" }}
            color="red"
          />
        }
        style={{ textAlign: "center", flex: "row" }}
      >
        <Text>{obj.name}</Text>
        <Divider />

        <Image preview={false} width={50} src={obj.image} />
        <Divider />
        <Text type="success">{obj.price} TL</Text>
      </Card>
    ));
  };

  return (
    <Sider
      theme={"light"}
      trigger={null}
      collapsible
      collapsed={basket.length === 0}
      width={300}
      collapsedWidth={0}
      style={{ paddingTop: 10 }}
    >
      <Badge showZero count={basket.length}>
        <CiShoppingCart size={25} />
      </Badge>

      {BasketItem()}

      <Divider>Total: {total} TL</Divider>
    </Sider>
  );
};

export default Sidebar;
