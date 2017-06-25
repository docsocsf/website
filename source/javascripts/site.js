import React from 'react';
import ReactDOM from 'react-dom';

function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.setRequestHeader("Accept", "application/vnd.github.mercy-preview+json");

    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      }
      else {
        reject(Error(req.statusText));
      }
    };

    req.onerror = function() {
      reject(Error("Network Error"));
    };

    req.send();
  });
}

const EmptyGithubProject = (id) => {
  return (
    <li className="github-project" key={id}>
      <div className="content" style={{height: "88px"}}></div>
      <span className="meta" style={{height: "19px"}}></span>
    </li>
  );
};

const GithubProject = (data) => {
  data.topics = data.topics || [];
  const topics = data.topics.map((t) => (<small className="project-tag" key={t}>{t}</small>));
  return (
    <li className="github-project" key={data.url}>
      <div className="content">
        <h3 className="project"><a href={`https://github.com/docsocsf/${data.name}`} target="_blank">{data.name}</a></h3>
        <p>{data.description}</p>
        <span className="topics">
          {topics}
        </span>
      </div>
      <span className="meta">
        <span className="github-lang">{data.language}</span>
        <span className="icon github-stars">{data.stargazers_count}</span>
        <span className="icon github-issues"><a href={`https://github.com/docsocsf/${data.name}/issues`} target="_blank">{data.open_issues}</a></span>
      </span>
    </li>
  );
};

class GithubProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {repos: []};
  }

  componentDidMount() {
    let projects = this;
    get('https://api.github.com/orgs/docsocsf/repos')
      .then(
        function (response) {
          projects.setState({
            repos: JSON.parse(response)
          });
        },
        function (reason) {
          console.error('Something went wrong', reason);
        });
  }

  render() {
    let repos = this.state.repos;
    let projects = null;
    if (repos.length === 0) {
      projects = [1,2,3].map(EmptyGithubProject);
    } else {
      repos = repos.sort((a, b) => b.pushed_at.localeCompare(a.pushed_at)).slice(0, 3);
      projects = repos.map(GithubProject);
    }
    return (
      <div>
        <h2>Featured Projects</h2>
        <ul id="featured-projects-list">
          {projects}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<GithubProjects/>, document.getElementById("featured-projects"));

