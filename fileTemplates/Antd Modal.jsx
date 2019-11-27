import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'antd';

export default class ${NAME} extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        title: PropTypes.any,
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
    };

    componentDidUpdate(prevProps) {
        const {visible} = this.props;

        // 打开弹框
        if (!prevProps.visible && visible) {
            this.handleBeforeOpen();
        }
    }

    handleBeforeOpen = () => {
        // TODO
    };

    handleOk = () => {
        const {onOk} = this.props;

        if (onOk) onOk();
    };

    handleCancel = () => {
        const {onCancel} = this.props;
        if (onCancel) onCancel();
    };

    render() {

        const {
            visible,
            // TODO
            title = 'Title',
            onOk,
            onCancel,
            ...others
        } = this.props;

        return (
            <Modal
                {...others}
                title={title}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                Modal Content
            </Modal>
        );
    }
}
