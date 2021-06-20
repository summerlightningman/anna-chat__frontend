import {FC, MouseEventHandler} from "react";
import "./login.css";
import {useSelector} from "react-redux";
import {RootState} from "../../store/reducers";


const Login: FC = () => {
    const state: RootState = useSelector(state => state.login)
    const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
        e.preventDefault();
    };

    return (
        <div className="login">
            <h1 className="page-header">Вход</h1>
            <form>
                <label htmlFor="login">Логин</label>
                <input type="text" id="login" name="login"/>
                <label htmlFor="password">Пароль</label>
                <input type="password" id="password" name="password"/>
                <button onClick={handleClick}>Отправить</button>
            </form>
        </div>
    );
};

export default Login;