import {FC, MouseEventHandler} from "react";
import "./login.css";
import {useTypedSelector} from "../../hooks/useTypedSelector";


const Login: FC = () => {
    const {login, password, error} = useTypedSelector(state => state.login);
    const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
        e.preventDefault();
    };

    return (
        <div className="login">
            <h1 className="page-header">Вход</h1>
            <form>
                <label htmlFor="login">Логин</label>
                <input type="text" id="login" name="login" value={login}/>
                <label htmlFor="password">Пароль</label>
                <input type="password" id="password" name="password" value={password}/>
                <button onClick={handleClick}>Отправить</button>
                {error && <span className="error">{error}</span>}
            </form>
        </div>
    );
};

export default Login;