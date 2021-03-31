import { Row, Col } from 'antd';
import { ICoreLayoutProps } from "./CoreLayoutTypes";
import './CoreLayout.css';

export const CoreLayout = ({ children }: ICoreLayoutProps) => (
  <Row justify='center' align="middle" className="core">
    <Col xs={24}>
      {children}
    </Col>
  </Row>
);

export default CoreLayout;