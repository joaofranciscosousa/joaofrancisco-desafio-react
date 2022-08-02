import "./Search.css";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useState, useContext } from "react";
import { Context } from "../../Context";

const Search = (): JSX.Element => {
    const [name, setName] = useState<string>("");

    const { setUser } = useContext(Context);

    function SearchUser() {
        if (name === "") {
            alert("informe um nome de usuário válido do github");
        } else {
            axios
                .get(`https://api.github.com/users/${name}`)
                .then((res: AxiosResponse) => {
                    setUser(res.data);
                    window.location.href = `/${name}`;
                })
                .catch((err: AxiosError) => {
                    alert(
                        "Usuário não encontrado no github. Verifique se você digitou o nome corretamente"
                    );
                });
        }
    }

    return (
        <div className="search">
            <div className="search_container">
                <h5>Buscar Repositório no github</h5>
                <div className="search_input">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Digite o nome de usuário"
                            value={name}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setName(e.target.value);
                            }}
                        />
                        <button className="btn btn-danger" onClick={SearchUser}>
                            <i className="bi bi-search"></i> Buscar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
