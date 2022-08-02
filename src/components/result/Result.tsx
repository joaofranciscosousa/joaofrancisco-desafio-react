import "./Result.css";
import { useState, useEffect, useContext } from "react";
import axios, {AxiosResponse, AxiosError} from "axios";
import { useParams } from "react-router-dom";
import { Context } from "../../Context";

interface Ropositories {
    name: string;
    updated_at: string;
    language: string | null;
    license: {
        name: string;
    };
    forks_count: number;
    stargazers_count: number;
    html_url: string;
    description: string;
}

const Result = (): JSX.Element => {
    const [repositories, setRepositories] = useState<Ropositories[]>([]);
    const { username } = useParams<string>();

    const { user } = useContext(Context);

    useEffect(() => {
        axios
            .get(`https://api.github.com/users/${username}/repos`)
            .then((res: AxiosResponse) => {
                setRepositories(res.data);
            })
            .catch((err: AxiosError) => {
                alert("Erro ao encontrar um usuário");
                window.location.href = "/";
            });
    }, [user]);

    function GoHome() {
        localStorage.setItem("user", "");
        window.location.href = "/";
    }

    return (
        <>
            <div className="result_header">
                <div className="result_headerEmpty"></div>
                <div className="result_headerMenu">
                    <a href={`/${user.login}`}>
                        <i className="bi bi-book"></i> Repositories (
                        {user.public_repos})
                    </a>
                    <a onClick={GoHome}>
                        <i className="bi bi-house"></i> Pesquisa
                    </a>
                </div>
            </div>
            <div className="result">
                <div className="result_info">
                    <div className="result_infoUser">
                        <div className="result_infoImage">
                            <img src={user.avatar_url} alt={user.name} />
                        </div>
                        <div className="result_username">
                            <h3>{user.name}</h3>
                            <h5>{user.login}</h5>
                            <button>Follow</button>
                            <p>@{user.login}</p>
                            <p>
                                <i className="bi bi-people"></i>
                                <p>{user.followers}</p> followers ·
                                <p>{user.following}</p> Following
                            </p>
                            {user.email && (
                                <p>
                                    <i className="bi bi-envelope"></i>{" "}
                                    {user.email}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="result_repo">
                        {repositories.map(
                            ({
                                name,
                                description,
                                updated_at,
                                language,
                                license,
                                forks_count,
                                stargazers_count,
                                html_url,
                            }) => (
                                <div className="result_repoEach" key={name}>
                                    <h5>
                                        <a href={html_url}>{name}</a>
                                    </h5>
                                    {description && <p>{description}</p>}
                                    <div>
                                        {language && (
                                            <p>
                                                <i className="bi bi-circle-fill"></i>{" "}
                                                {language}
                                            </p>
                                        )}
                                        {forks_count > 0 && (
                                            <p>
                                                <i className="bi bi-diagram-2-fill"></i>{" "}
                                                {forks_count}
                                            </p>
                                        )}
                                        {stargazers_count > 0 && (
                                            <p>
                                                <i className="bi bi-star"></i>{" "}
                                                {stargazers_count}
                                            </p>
                                        )}
                                        <p>
                                            Updated on{" "}
                                            {new Date(
                                                updated_at
                                            ).toLocaleString("en-US", {
                                                day: "2-digit",
                                            })}{" "}
                                            {new Date(
                                                updated_at
                                            ).toLocaleString("en-US", {
                                                month: "short",
                                            })}
                                        </p>
                                        {license?.name && (
                                            <p>
                                                <i className="bi bi-bank"></i>{" "}
                                                {license?.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Result;
