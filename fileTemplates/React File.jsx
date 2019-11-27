import React, {Component} from 'react';
import config from '@/commons/config-hoc';
import PageContent from "@/layouts/page-content";

@config({path: '/user-center'})
export default class index extends Component {
    state = {};

    componentDidMount() {

    }

    render() {
        return (
            <PageContent>
                init index
            </PageContent>
        );
    }
}
