import React from "react";
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Env } from './firebase/Firestore';
import Preview from './Preview';

type ShowProps = {
    text?: string;
    match?: any;
}
type ShowState = {
    title: string;
    discription: string;
    body: string;
}

class Show extends React.Component<ShowProps, ShowState> {
    state = {
        title: '',
        discription: '',
        body: ''
    };
    constructor(props: ShowProps) {
        super(props);

        const id = this.props.match.params.id;
        this.display(id);
    }

    async display(id: string) {
        const blog = await Env.instance.getBlog(id);
        this.setState({
            title: blog.title,
            discription: blog.discription,
            body: blog.body
        })
    }

    render() {
        return (
            <div className="Show" >
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <Button size='large' color="secondary">Back</Button>
                </Link>
                <Typography variant='h2'>{this.state.title}</Typography>
                <Typography variant='h4' color="textSecondary">{this.state.discription}</Typography>
                <Preview
                    data={this.state.body} // markedでhtmlにパースするときのデータ
                />
            </div>
        );
    }
}
export default Show;