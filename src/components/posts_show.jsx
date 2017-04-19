import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { showPost, deletePost } from '../actions/index';


class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    this.props.showPost(this.props.params.id);
  }

  onDeleteClick(id) {
    this.props.deletePost(id)
    .then(() => {
      this.context.router.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return (<div>LOADING...</div>);
    }

    return (
      <div>
        <Link to="/">Back to index</Link>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
        <button
          className="btn btn-danger"
          onClick={() => {this.onDeleteClick(post.id).bind(this)}}
        >
          Delete post
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.post,
  };
}

export default connect(mapStateToProps, { showPost, deletePost })(PostsShow);
