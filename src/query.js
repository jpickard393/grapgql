const githubQuery = {
    query: `{ 
        viewer { 
          login
      } 
    }`
};

const repoQuery = {
    query: `{ 
        viewer { 
        login
         repositories(first: 10 orderBy: 
            {field: CREATED_AT, direction: DESC} 
          ) {
           edges {
            node {
                id
               name
               url
              }
           }
         } 
        }
        }`
}
export { githubQuery, repoQuery };