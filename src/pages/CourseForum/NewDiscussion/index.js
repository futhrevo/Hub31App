/* eslint-disable max-len, no-return-assign */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addPost, updatePost } from '../../../api/posts';
import TagsInput from '../../../components/Forum/NewDiscussion/TagsInput';
import { TextEditor } from '../../../components/TextEditor';
import urlPopLastPath from '../../../modules/url-pop-path';
import { addPostAction, updatePostAction } from '../../../redux/forums/postsActions';
import ErrorBoundary from '../../ErrorBoundary';

const NewDiscussion = (props) => {
  const alert = useAlert();
  const [title] = useState(props.discussion.title);
  const [body, setBody] = useState(props.discussion.body);
  const [tags, setTags] = useState(props.discussion.tags);
  const [validated, setValidated] = useState(false);
  const [errorMsg, setError] = useState('');
  const [postingDiscussion, setPosting] = useState(false);
  const [postingSuccess, setPostSuccess] = useState(false)

  if (errorMsg) {
    return <div className="errorMsg fatalError">{errorMsg}</div>;
  }

  const { currentForum, history, discussion, toggleEdit, match, add, update, courseId, author, fslug } = props;
  const existingDocument = discussion && discussion.slug;

  async function handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (!form.terms.checked) {
      alert.error("Terms not accepted");
      return;
    }
    const title = form.title.value.trim();
    if (title.length < 10) {
      alert.error("Choose a little eloborate title");
      return;
    }

    const doc = {};
    doc.tags = tags;
    doc.body = body;
    doc.title = title;
    doc.author = author;

    if (existingDocument) {
      doc.slug = discussion.slug;
    }

    if (postingDiscussion) {
      return;
    }
    setPosting(true);
    const forum = `${courseId}_${fslug}`;
    try {
      const response = existingDocument ? await updatePost(forum, doc) : await addPost(forum, doc);
      const confirmation = existingDocument ? 'Discussion updated!' : 'Discussion posted!';
      alert.success(confirmation);
      setError('');
      setPostSuccess(true);
      if (existingDocument) {
        update(courseId, fslug, doc.slug, doc);
        toggleEdit();
        setPostSuccess(false)
      } else {
        const { cAt, slug } = response;
        doc.cAt = cAt;
        doc.slug = slug;
        doc.favC = 0;
        doc.comC = 0;
        add(courseId, fslug, slug, doc);
        setPostSuccess(false)
        history.push(urlPopLastPath(match.url));
      }
    } catch (e) {
      alert.error('Unable to Create Discussion');
      setError(e.message);
    } finally {

    }
  }

  function renderEditor() {
    return (
      <Form
        noValidate
        validated={validated}
        onSubmit={e => handleSubmit(e)}
      >
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            name="title"
            type="text"
            defaultValue={title}
            placeholder="Discussion title..."
          />
          <Form.Control.Feedback type="invalid">
            Give a title here
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <TextEditor
            html={body}
            onChange={setBody}
            placeholder="Provide Discussion here..."
          />
        </Form.Group>
        <TagsInput
          key="tags"
          value={tags}
          onChange={(tagg) => {
            setTags(tagg);
          }}
        />
        <Form.Group className="p-3">
          <Form.Check
            name="terms"
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button type="submit" variant="success" disabled={postingDiscussion}>
            {existingDocument ? 'Edit Discussion' : 'Add Discussion'}
          </Button>
        </div>
      </Form>
    );
  }

  return (
    <ErrorBoundary>
      <div className="content">
        <div className="d-flex justify-content-end">
          {!existingDocument && (
            <Button
              variant="danger"
              onClick={() => {
                history.goBack();
              }}
            >
              Cancel
            </Button>
          )}
        </div>
        <div className="forumInfo">
          {`You are ${existingDocument ? 'editing' : 'creating a new'
            } discussion on `}
          <b>
            <span className="forumName">{currentForum}</span>
          </b>
        </div>
        <div className="errorMsg">{errorMsg}</div>
        {postingSuccess && (
          <div className="successMsg">
            {`Your discussion is ${existingDocument ? 'edited' : 'created'
              } :-)`}
          </div>
        )}
        {renderEditor()}
        {postingDiscussion && (
          <div className="postingMsg">Posting discussion...</div>
        )}
      </div>
    </ErrorBoundary>
  );
}

NewDiscussion.propTypes = {
  currentForum: PropTypes.string,
  history: PropTypes.object,
  discussion: PropTypes.object,
  toggleEdit: PropTypes.func,
  match: PropTypes.object,
};

NewDiscussion.defaultProps = {
  discussion: {
    title: '',
    body: '<div>Replace this text</div>',
    tags: [],
  },
  currentForum: 'test title'
};

const mapStateToProps = (state, { courseId, match, fslug }) => {
  let forum_slug = 'general';
  if (match) {
    forum_slug = match.params?.forum_slug;
  } else {
    forum_slug = fslug;
  }
  return {
    fslug: forum_slug,
    currentForum: state?.Courses[courseId]?.Forums?.byId[forum_slug]?.title ?? '',
    author: `${state?.Accounts?.name ?? ''} ${state?.Accounts?.family_name ?? ''}`,
  }
}

const mapDispatchToProps = dispatch => ({
  add: (id, slug, pslug, data) => { dispatch(addPostAction(id, slug, pslug, data)) },
  update: (id, slug, pslug, data) => { dispatch(updatePostAction(id, slug, pslug, data)) }
})
export default connect(mapStateToProps, mapDispatchToProps)(NewDiscussion);

