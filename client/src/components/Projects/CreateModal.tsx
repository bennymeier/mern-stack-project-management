import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Message } from "semantic-ui-react";
import { createProject } from "../../utils/API/project_API";

export interface CreateModalProps {
  isOpen: boolean;
  handleClose: () => void;
}
const CreateModal: React.FC<CreateModalProps> = (props) => {
  const { isOpen, handleClose } = props;
  const [projectName, setName] = useState("");
  const [projectKey, setKey] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const project = { key: projectKey, name: projectName };
    const { data, success } = await createProject(project);
    if (success) {
      setName("");
      setKey("");
      setError(false);
      handleClose();
    } else {
      setError(true);
    }
  };
  const isDisabled = !!!projectName || !!!projectKey;
  return (
    <Modal open={isOpen} size="mini" centered>
      <Modal.Header>Create project</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              onChange={(event) => setName(event.target.value)}
              label="Name"
              placeholder="Enter a project name"
              value={projectName}
            />
            <Form.Input
              onChange={(event) => setKey(event.target.value.toUpperCase())}
              placeholder="Key"
              label="Key"
              value={projectKey}
            />
            <Message
              error
              header="Project could not be created"
              visible={error}
            />
            <Button
              type="submit"
              floated="right"
              className="mb"
              disabled={isDisabled}
            >
              Create
            </Button>
          </Form>
          <Button basic color="red" onClick={() => handleClose()}>
            Cancel
          </Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default CreateModal;
