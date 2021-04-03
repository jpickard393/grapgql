import { useEffect, useState, useCallback } from "react";
import github from "./db.js";
import { repoQuery } from "./query";
function App() {
  const [userName, setUserName] = useState("");
  const [repoList, setRepoList] = useState(null);

  const fetchData = useCallback(() => {
    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(repoQuery)
    })
      .then(response => response.json())
      .then(retData => {
        const viewer = retData.data.viewer;
        setUserName(viewer.login);
        setRepoList(retData.data.viewer.repositories.edges);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary"><i className="bi bi-diagram-2-fill">HELLO {userName}</i></h1>

      {repoList && (
        <ul className="list-group list-grouop-flush">
          {repoList.map((repo) => (
            <li className="list-group-item" key={repo.node.id}>
              <a className="h5 mb-0 text-decoration-none" href={repo.node.url}>
                {repo.node.name}
              </a>
              <p className="small">{repo.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
