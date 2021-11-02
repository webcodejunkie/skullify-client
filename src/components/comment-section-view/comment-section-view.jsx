import React from 'react';

import './comment-section-view.scss';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

export class CommentSection extends React.Component {
  render() {

    return (
      <Container className="p-3 d-flex flex-column" >
        <div className="commentSectionBox">
          Box Created!
        </div>
        <FloatingLabel controlId="floatingTextarea" className="mb-3">
          <Form.Control as="textarea" placeholder="Leave a comment here" />
          <Button variant="success" >Submit</Button>
        </FloatingLabel>
      </Container>
    );
  }
}