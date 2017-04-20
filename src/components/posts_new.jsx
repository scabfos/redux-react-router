import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { createPost } from '../actions/index';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title',
  },
  categories: {
    type: 'input',
    label: 'Categories',
  },
  content: {
    type: 'textarea',
    label: 'Post contents',
  },
};

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // blog post has been created, navigate the user to the index
        // we navigate by calling this.context.router.push witht the new path to navigate to
        this.context.router.push('/');
      });
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];

    return (
      <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`} key={fieldConfig.key}>
        <label htmlFor="title">{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
        <div className="text-help">
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a new post</h3>
        { _.map(FIELDS, this.renderField.bind(this)) }
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `Enter ${field}`;
    }
  });

  return errors;
}

export default reduxForm({
  form: 'PostsNew',
  fields: _.keys(FIELDS),
  validate,
}, null, { createPost })(PostsNew);
