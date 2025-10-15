import { Spin } from "antd";

const contentStyle: React.CSSProperties = {
  padding: 50,
};

const content = <div style={contentStyle} />;


const Loader = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <Spin tip={"Loading"}  size="large" >
        {content}
    </Spin>
  </div>
);

export default Loader;
