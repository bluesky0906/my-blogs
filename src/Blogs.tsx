import React from "react";
import { Button, List, Typography, CardContent } from "@material-ui/core";
import { BlogInfo, Env } from "./firebase/Firestore";
import { Link } from "react-router-dom";

type BlogsProps = {
  text?: string;
};
type BlogsState = {
  list: BlogInfo[];
  text: string;
};

class Blogs extends React.Component<BlogsProps, BlogsState> {
  constructor(props: BlogsProps) {
    super(props);
    this.state = {
      list: [
        {
          id: "",
          title: "",
          discription: "",
          body: "",
        },
      ],
      text: "",
    };
  }

  async setBlogs() {
    const list = await Env.instance.getBlogs();
    this.setState({ list: list });
  }

  deleteBlog = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const id = e.currentTarget.getAttribute("value");
    if (id) {
      await Env.instance.deleteBlog(id);
      this.setBlogs();
    }
  };
  render() {
    this.setBlogs();

    return (
      <div className="App">
        <Link to="Edit/" style={{ textDecoration: "none" }}>
          <Button size="large" color="secondary">
            New
          </Button>
        </Link>
        <Link to="Signin/" style={{ textDecoration: "none" }}>
          <Button size="large" color="secondary">
            Sign in
          </Button>
        </Link>

        {this.state.list.map((blog) => {
          return (
            <List color="secondary" key={blog.id}>
              <CardContent color="primary">
                <Typography variant="h5">{blog.title}</Typography>
                <Typography variant="body1" color="textSecondary">
                  {blog.discription}
                </Typography>
                <Button
                  value={blog.id}
                  color="default"
                  onClick={this.deleteBlog}
                >
                  Delete
                </Button>
                <Link
                  to={"/Edit/" + blog.id}
                  style={{ textDecoration: "none" }}
                >
                  <Button value={blog.id} color="primary">
                    Edit
                  </Button>
                </Link>
                <Link
                  to={"/Show/" + blog.id}
                  style={{ textDecoration: "none" }}
                >
                  <Button value={blog.id} variant="outlined" color="secondary">
                    READ More
                  </Button>
                </Link>
              </CardContent>
            </List>
          );
        })}
      </div>
    );
  }
}

export default Blogs;
