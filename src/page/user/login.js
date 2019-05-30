import React, {Component} from 'react';
import {Tabs, Icon, Input, Button} from 'antd';
import styles from './login.less';
import Link from 'umi/link'
import {formatMessage, FormattedMessage} from 'umi-plugin-react/locale'
import Login from "../../components/Login";
import {connect} from 'dva';

const {TabPane} = Tabs;
const {Submit} = Login

@connect(({login, loading}) => ({
    login,
    submitting: loading.effects['login/submit'],
}))
class LoginPage extends Component {
    handleSubmit = (err, values) => {
        if (!err) {
            const {dispatch} = this.props;
            dispatch({
                type: 'login/submit',
                payload: {
                    ...values,
                }
            })
        }
    }

    render() {
        const {submitting} = this.props;
        return (
            <div className={styles.main}>
                <Login onSubmit={this.handleSubmit}>
                    <Button loading={submitting} size="large" className={styles.submit} block={true} type="primary"
                            htmlType="submit">
                        <FormattedMessage id="app.login.login"/>
                    </Button>
                    <div className={styles.other}>
                        <FormattedMessage id="app.login.sign-in-with"/>
                        <Icon type="alipay-circle" className={styles.icon} theme="outlined"/>
                        <Icon type="taobao-circle" className={styles.icon} theme="outlined"/>
                        <Icon type="weibo-circle" className={styles.icon} theme="outlined"/>
                        <Link className={styles.register} to="/user/register">
                            <FormattedMessage id="app.login.signup"/>
                        </Link>
                    </div>
                </Login>
            </div>);
    }
}

export default LoginPage;