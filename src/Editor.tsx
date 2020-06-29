import React from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Env } from './firebase/Firestore';
import Preview from './Preview'


type EditorProps = {
    text?: string;
    match?: any;
}
type EditorState = {
    title: string;
    discription: string;
    body: string;
}

class Editor extends React.Component<EditorProps, EditorState> {
    state = {
        title: '',
        discription: '',
        body: ''
    };
    style = {
        title: {
            fontSize: '2.0rem',
            width: '90%',
            margin: '0.5rem auto',
        },
        discription: {
            fontSize: '1.0rem',
            width: '90%',
            margin: 'auto',
        },
        body: {
            width: '90%',
            margin: '0.5rem auto',
        }
    }
    constructor(props: EditorProps) {
        super(props);

        const id = this.props.match.params.id;
        if (id) {
            this.display(id);
        }
    }

    setBlog = async () => {
        const data = {
            id: this.props.match.params.id,
            title: this.state.title,
            discription: this.state.discription,
            body: this.state.body
        }
        const list = await Env.instance.setBlog(data);
        console.debug(list);
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
            <div className="Editor" >
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <Button color="default">Cancel</Button>
                    <Button color="primary" onClick={this.setBlog}>Save</Button>
                </Link>
                <TextField fullWidth={true} InputProps={{ style: this.style.title }}
                    color='primary' placeholder='title' value={this.state.title}
                    onChange={(e) => this.setState({ title: e.target.value })} />

                <TextField fullWidth={true} InputProps={{ style: this.style.discription }}
                    color='secondary' placeholder='discriprion' value={this.state.discription}
                    variant='outlined'
                    onChange={(e) => this.setState({ discription: e.target.value })} />
                <Grid container style={this.style.body} justify='space-between'>
                    <Grid item xs={6}>
                        <TextField fullWidth={true}
                            color='secondary' placeholder='body' value={this.state.body}
                            multiline rows={60} variant="outlined"
                            onChange={(e) => this.setState({ body: e.target.value })} />
                    </Grid>
                    <Grid item xs={6}>
                        <Preview
                            data={this.state.body}
                        />
                    </Grid>
                </Grid>
            </div >
        );
    }
}

export default Editor;