import React from 'react';
import { Result } from 'antd';
import {Link} from 'react-router-dom'
const NotFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    style={{ paddingTop: '150px'}}
    extra={<Link to='/'>Back Home</Link>}
  />
);

export default NotFoundPage;