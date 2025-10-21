import { Col, Row } from "antd"
import ProfileCard from "./components/ProfileCard"

const Profile = () => {
  return (
    <div>
        {/* User Basic Card + Edit Details Button + button click opens drawer form */}
        <Row>
            {/* User basic card */}
            <Col span={7}>
                <ProfileCard />
            </Col>
            {/* User Other details */}
            <Col span={17}>
            </Col>
        </Row>
        {/* LEFT SIDE: Quick Details */}
        {/* RIGHT SIDE: Details like attendance in tabs */}
        {/* Other Main stuff */}
    </div>
  )
}

export default Profile