import React from 'react';
import { graphql } from 'gatsby';

import Layout from './../components/Layout';
import ProjectListingSection from './../components/ProjectListingSection';

const ProjectsPageInner = props => {
  try {
    const allProjects = props.data.allMarkdownRemark.edges;

    const personalProjects = allProjects.filter(
      project => project.node.fields.projectType === 'personal'
    );

    const professionalProjects = allProjects.filter(
      project => project.node.fields.projectType === 'professional'
    );

    return (
      <div>
        <h1>Projects</h1>
        {personalProjects.length > 0 && (
          <ProjectListingSection
            projects={personalProjects}
            sectionTitle="Personal"
          />
        )}

        {professionalProjects.length > 0 && (
          <ProjectListingSection
            projects={professionalProjects}
            sectionTitle="Professional"
          />
        )}
      </div>
    );
  } catch (e) {
    console.log(e);
    return <h2>Unable to find any projects.</h2>;
  }
};

class ProjectsPage extends React.Component {
  render() {
    return (
      <Layout>
        <ProjectsPageInner {...this.props} />
      </Layout>
    );
  }
}

export default ProjectsPage;

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: {
        frontmatter: { publish: { eq: true } }
        fields: { type: { eq: "project" } }
      }
      sort: { fields: [frontmatter___order], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            lede
          }
          fields {
            slug
            projectType
          }
        }
      }
    }
  }
`;
