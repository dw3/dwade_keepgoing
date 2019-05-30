import { formatMessage } from 'umi-plugin-react/locale';
import { Icon } from 'antd';
import React, { Component, Fragment } from 'react';
import DocumentTitle from 'react-document-title';
import styles from './UserLayout.less';
import Link from 'umi/link';
import logo from '../assets/logo.svg';
import GlobalFooter from '@/components/GlobalFooter';
// import getPageTitle from '../utils/getPageTitle';
// import SelectLang from '../components/SelectLang';
const links = [{
    key: 'help',
    title: formatMessage({id: 'layout.user.link.help'}),
    href: '',
}, {
    key: 'privacy',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: '',
}, {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: '',
}];
const copyright = (
    <Fragment>
        Copyright <Icon type="copyright" />2019 gasol体验技术部出品
    </Fragment>
)
class UserLayout extends Component {
    render() {
        const {
            children,
            location: { pathname },
            breadcrumbNameMap,
        } = this.props;
        return( <DocumentTitle title="123">
            <div className={styles.container}>
                {/*<div className={styles.lang}>*/}
                {/*    <SelectLang />*/}
                {/*</div>*/}
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <Link to="/">
                                <img alt="logo" className={styles.logo} src={logo} />
                                <span className={styles.title}>Gasol Design</span>
                            </Link>
                        </div>
                        <div className={styles.desc}>Gasol Design 是最具影响力的 Web 设计规范</div>
                    </div>
                    {children}
                </div>
                <GlobalFooter links={links} copyright={copyright} />
            </div>
        </DocumentTitle>)
    }
}
export default UserLayout;