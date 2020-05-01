import React, { useState } from "react";
import { Button, Form, Modal, Message } from "semantic-ui-react";
import { createProject, Project } from "../../utils/API/project_API";
import { User } from "../../utils/API/user_API";

export interface CreateModalProps {
  currentUser: User;
  isOpen: boolean;
  handleClose: () => void;
}
const CreateModal: React.FC<CreateModalProps> = (props) => {
  const { isOpen, handleClose, currentUser } = props;
  const [projectName, setName] = useState("");
  const [projectKey, setKey] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const project: Partial<Project> = {
      key: projectKey,
      name: projectName,
      administrators: [currentUser.email],
    };
    const { success } = await createProject(project);
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
              color="green"
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
