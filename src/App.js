import React, { useState, useEffect } from 'react';

import api from './services/api';

import './styles.css';

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get('repositories').then((response) => {
            setRepositories(response.data);
        });
    }, []);

    async function handleAddRepository() {
      const response = await api.post('repositories', {
        title: `Data Science com Python ${Date.now()}`,
        url: "https://google.com",
        techs: [
          "Django",
          "SQL"
        ]
      });

      const repository = response.data;

      setRepositories([...repositories, repository]);
    }

    async function handleRemoveRepository(id) {
        await api.delete(`repositories/${id}`).then((response) => {
          console.log('Repository deleted succesfully');
        });

        const repositoriesFiltered = repositories.filter((repository) => {
          return repository.id !== id;
        });

        setRepositories(repositoriesFiltered);
    }

    return (
        <div>
            <ul data-testid="repository-list">
                {repositories.map((repository) => {
                    return (
                        <li key={repository.id}>
                            {repository.title}
                            <button
                                onClick={() => handleRemoveRepository(repository.id)}
                            >
                                Remover
                            </button>
                        </li>
                    );
                })}
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
