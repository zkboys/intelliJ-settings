import React, {Component} from 'react';
import {Form, Input, Button, message} from 'antd';
import {PageContent, FormItemLayout} from 'zk-tookit/antd';
import {ajax} from 'zk-tookit/react';

export const PAGE_ROUTE = '/materials/+edit/:id';

@ajax()
@Form.create()
export default class MaterialEdit extends Component {
    state = {
        loading: false,
        isAdd: true,
        data: {},
    };

    componentWillMount() {
        const {id} = this.props.params;
        const {$ajax} = this.props;
        if (id === ':id') {
            this.setState({isAdd: true});
        } else {
            this.setState({isAdd: false});
            $ajax.get(`/materials/${id}`).then(res => {
                this.setState({
                    data: res,
                });
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {isAdd, loading} = this.state;
        const {form, $ajax, router} = this.props;

        if (loading) return;

        form.validateFields((err, values) => {
            if (!err) {
                const submitAjax = isAdd ? $ajax.post : $ajax.put;
                const successTip = isAdd ? '添加成功' : '修改成功';

                this.setState({loading: true});

                submitAjax('/materials', values).then(() => {
                    message.success(successTip, 1.5, () => router.push('/materials'));
                }).catch(() => {
                    this.setState({loading: false});
                });
            }
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    render() {
        const {form: {getFieldDecorator}} = this.props;
        const {loading, isAdd, data = {}} = this.state;
        const title = isAdd ? '添加XXX' : '修改XXX';

        const labelSpaceCount = 4;

        return (
            <PageContent>
                <h1 style={{textAlign: 'center'}}>{title}</h1>
                <Form onSubmit={this.handleSubmit}>
                    {!isAdd ? getFieldDecorator('_id', {initialValue: data._id})(<Input type="hidden"/>) : null}
                    <FormItemLayout
                        label="名称"
                        labelSpaceCount={labelSpaceCount}
                        style={{maxWidth: 300}}
                    >
                        {getFieldDecorator('name', {
                            initialValue: data.name,
                            rules: [
                                {required: true, message: '请输入名称！'},
                            ],
                        })(
                            <Input placeholder="请输入名称"/>
                        )}
                    </FormItemLayout>
                    <div>
                        <Button
                            style={{marginRight: 8}}
                            loading={loading}
                            type="primary"
                            onClick={this.handleSubmit}
                        >
                            提交
                        </Button>
                        <Button
                            type="ghost"
                            onClick={this.handleReset}
                        >
                            重置
                        </Button>
                    </div>
                </Form>
            </PageContent>
        );
    }
}
