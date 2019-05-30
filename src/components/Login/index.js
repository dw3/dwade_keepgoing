import React, {Component} from 'react';
import styles from "./index.less";
import {Form, Input, Icon, Tabs, Button,Row,Col} from 'antd';
import {formatMessage, FormattedMessage} from 'umi-plugin-react/locale'
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const {TabPane} = Tabs;

class Login extends Component {
    static defaultProps={
        onSubmit:()=>{},
    }
    static propTypes = {
        onSubmit: PropTypes.func,
    };
    constructor(props) {
        super(props);
        this.state = {
            type: "account",
            active: {"account":["username","password"]},
            count:0,
            disable:true
        }
    }

    onSwitch = type => {

        this.setState({
            type,
        })
        const {active} = this.state;
        console.log("type:"+type)
        if (type == "account") {
            if (active[type]) {
                active[type].push("username")
                active[type].push("password")
            } else {
                active[type] = ["username", "password"];
            }
        } else if(type == "mobile"){
            if (active[type]) {
                active[type].push("mobile")
                active[type].push("captcha")
            } else {
                active[type] = ["mobile","captcha"];
            }
        }
        this.setState({
            active,
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        const {tabs,onSubmit} = this.props
        const {type, active} = this.state;
        const activeFields = active[type];
        console.log(activeFields)
        let a = {"type":type};
        this.props.form.validateFields(activeFields, {force: true}, (err, values) => {
            if (!err) {
                values=Object.assign(values,a);
                console.log('Receiced values of form', JSON.stringify(values));
                onSubmit(err,values);
            }
        });
    }
    onGetCaptcha=()=>{
        this.runGetCaptchaCountDown()
    }
    runGetCaptchaCountDown = () => {
        let count =  59;
        this.setState({ count });
        this.interval = setInterval(() => {
            count -= 1;
            this.setState({ count });
            console.log("count:"+count);
            if (count === 0) {
                clearInterval(this.interval);
            }
        }, 1000);
    };
    getCaptchaText = ()=>{
        const {count} = this.state;
        return count>0?count+formatMessage({id:"form.captcha.second"}):formatMessage({id:'form.get-captcha'});
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {count} = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Tabs defaultActiveKey="account" size="large" style={{textAlign: "center"}} animated={false}
                      onChange={this.onSwitch}>
                    <TabPane tab={formatMessage({id: 'app.login.tab-login-credentials'})} key="account">
                        <FormItem>{getFieldDecorator('username', {
                            rules: [{required: true, message: formatMessage({id: 'validation.userName.required'})}]
                        })(
                            <Input
                                size="large"
                                placeholder={formatMessage({id: 'app.login.userName'})}
                                prefix={<Icon type="user" className={styles.prefixIcon}/>}
                                id="username"
                                allowClear={true}
                            />)}
                        </FormItem>
                        <FormItem>{getFieldDecorator('password', {
                            rules: [{required: true, message: formatMessage({id: 'validation.password.required'})}]
                        })(<Input
                                size="large"
                                placeholder={formatMessage({id: 'app.login.password'})}
                                prefix={<Icon type="lock" className={styles.prefixIcon}/>}
                                id="password"
                                type="password"
                                allowClear={true}

                            />
                        )}
                        </FormItem>
                        <div>
                            <a style={{float:'right',marginBottom:'18px' }} href="">
                                <FormattedMessage id="app.login.forgot-password" />
                            </a>
                        </div>
                    </TabPane>
                    <TabPane tab={formatMessage({id: 'app.login.tab-login-mobile'})} key="mobile">
                        <FormItem>{getFieldDecorator('mobile', {
                            rules: [
                                {required: true, message: formatMessage({id: 'validation.phone-number.required'})},
                                { pattern: /^1\d{10}$/, message: formatMessage({id:"validation.phone-number.wrong-format"}),}
                            ]
                        })(
                            <Input
                                size="large"
                                placeholder={formatMessage({id: 'form.phone-number.placeholder'})}
                                prefix={<Icon type="mobile" className={styles.prefixIcon}/>}
                                id="mobile"
                                allowClear={true}
                            />)}
                        </FormItem>
                        <FormItem>
                            <Row gutter={8}>
                                <Col span={16}>
                                    {getFieldDecorator('captcha', {
                                        rules: [
                                            {required: true, message: formatMessage({id: 'validation.verification-code.required'})}]
                                    })(<Input  size="large"
                                               placeholder={formatMessage({id: 'form.verification-code.placeholder'})}
                                               prefix={<Icon type="mail" className={styles.prefixIcon}/>}
                                               id="captcha"
                                               allowClear={true}/>)}
                                </Col>
                                <Col span={8}>
                                    <Button
                                        disabled={count}
                                        className={styles.getCaptcha}
                                        size="large"
                                        onClick={this.onGetCaptcha}
                                    >
                                        {/*<FormattedMessage id="app.register.get-verification-code"/>*/}
                                        {this.getCaptchaText()}
                                    </Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </TabPane>
                </Tabs>
                {/*<Button loading={false}  size="large" className={styles.submit} block={true} type="primary" htmlType="submit">*/}
                {/*    <FormattedMessage id="app.login.login"/>*/}
                {/*</Button>*/}
                <div>{this.props.children}</div>
            </Form>
        );
    }
}

export default Form.create()(Login);