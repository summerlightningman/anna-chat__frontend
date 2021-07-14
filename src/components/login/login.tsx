import {ChangeEventHandler, FC, MouseEventHandler} from "react";
import "./login.css";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {loginActionTypes} from "../../types/login";
import {authorize} from "../../http";
import {Redirect} from "react-router-dom";
import {useCookies} from "react-cookie";


const Login: FC = () => {
    const {login, password, error, isLoggedIn} = useTypedSelector(state => state.login);
    const [cookies, ,] = useCookies(['token']);
    const dispatch = useDispatch();

    if ('token' in cookies && !isLoggedIn)
        dispatch({type: loginActionTypes.SET_IS_LOGGED_IN, payload: true})

    if (isLoggedIn)
        return <Redirect to="/main"/>

    const handleLoginInput: ChangeEventHandler<HTMLInputElement> = e =>
        dispatch({type: loginActionTypes.SET_LOGIN, payload: e.target.value});

    const handlePasswordInput: ChangeEventHandler<HTMLInputElement> = e =>
        dispatch({type: loginActionTypes.SET_PASSWORD, payload: e.target.value});

    const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
        e.preventDefault();
        if (!login && !password)
            return
        const form = new FormData();
        form.append('login', login);
        form.append('password', password);
        authorize(form).then(
            ({data}) => data.code === 200 && dispatch({type: loginActionTypes.SET_IS_LOGGED_IN, payload: true}),
            err => console.log(err)
        );
    };

    return (
        <div className="login">
            <h1 className="page-header">Вход</h1>
            <form>
                <div className="form-field">
                    <label htmlFor="login" className="form-label">Логин</label>
                    <input type="text" className="form-input" id="login" name="login" value={login}
                           onInput={handleLoginInput}/></div>
                <div className="form-field">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input type="password" className="form-input" id="password" name="password" value={password}
                           onInput={handlePasswordInput}/>
                </div>
                <button onClick={handleClick} className="form-submit">Отправить</button>
                {error && <span className="error">{error}</span>}
            </form>
        </div>
    );
};

export default Login;