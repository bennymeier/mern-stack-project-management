import React, { useState, useEffect } from "react";
import { Table, Icon } from "semantic-ui-react";
import { Project, getProjects } from "../../utils/API/project_API";
import { connect } from "react-redux";
import { AppState } from "../../redux";
import { User, updateUser } from "../../utils/API/user_API";

export interface ProjectsTable {
  currentUser: User;
}
const ProjectsTable: React.FC<ProjectsTable> = (props) => {
  const { currentUser } = props;
  const [projects, setProjects] = useState<Project[]>([]);
  const [favoriteProjects, setFavorites] = useState<string[]>(
    currentUser.favoriteProjects
  );
  useEffect(() => {
    const fetchProjects = async () => {
      const { success, data, error } = await getProjects();
      if (success) {
        setProjects(data);
      } else {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);

  const handleFavoriteClick = async (id: string) => {
    const favorites = favoriteProjects.includes(id)
      ? favoriteProjects.filter((fav) => fav !== id)
      : [...favoriteProjects, id];
    const { success } = await updateUser(currentUser.email, {
      favoriteProjects: favorites,
    });
    if (success) {
      setFavorites(favorites);
    }
  };
  return (
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width="2">Star</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Key</Table.HeaderCell>
          <Table.HeaderCell>Lead</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {projects.map((project) => {
          return (
            <Table.Row key={project._id}>
              <Table.Cell>
                <Icon
                  color={
                    favoriteProjects.includes(project._id)
                      ? "yellow"
                      : undefined
                  }
                  className="pointer"
                  name="star outline"
                  onClick={() => handleFavoriteClick(project._id)}
                />
              </Table.Cell>
              <Table.Cell>{project.name}</Table.Cell>
              <Table.Cell>{project.key}</Table.Cell>
              <Table.Cell>{project.administrators[0]}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
const mapStateToProps = (state: AppState) => ({
  currentUser: state.auth.user as User,
});
export default connect(mapStateToProps)(ProjectsTable);
