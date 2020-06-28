import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Input, List, Typography } from '@material-ui/core';
import { BlogInfo, Env } from './firebase/Firestore';


// Headerのpropsのtype aliasを定義
type AppProps = {
  text?: string;
}
type AppState = {
  list: BlogInfo[];
  text: string;
}


class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      list: [{ id: '', title: '' }],
      text: ''
    };
  }

  async setBlogs() {
    const list = await Env.instance.getBlogs();
    this.setState({ list: list });
  }

  setBlog = async () => {
    const text = this.state.text;
    if (text) {
      const list = await Env.instance.setBlog(text);
      console.debug(list);
      this.setState({ text: '' });
    }
    this.setBlogs();
  }

  deleteBlog = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const id = e.currentTarget.getAttribute('value');
    if (id) {
      await Env.instance.deleteBlog(id);
      this.setBlogs();
    }
  }

  render() {
    this.setBlogs()

    return (
      <div className="App" >
        <Typography variant='h3'>Sora's Blog</Typography>
        <Input color="secondary" type="text" placeholder="Add a blog..." value={this.state.text}
          onChange={(e) => this.setState({ text: e.target.value })} />
        <Button color="primary" onClick={this.setBlog}>Add</Button>

        {this.state.list.map((blog) => {
          return <List color="secondary" key={blog.id}>{blog.title}
            <Button value={blog.id} color="primary" onClick={this.deleteBlog}>Delete</Button></List>
        })
        }
      </div >
    );
  }
}

export default App;