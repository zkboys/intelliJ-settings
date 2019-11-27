import React, {Component} from 'react';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';

@config({
    path: '/${NAME}',
})
export default class ${NAME} extends Component {
    state = {};

    componentDidMount() {

    }

    render() {
        return (
            <PageContent>
                init ${NAME}
            </PageContent>
        );
    }
}

