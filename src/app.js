import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import PersonContainer from './person/person-container'
import UserContainer from './user/user-container'
import DeviceContainer from "./device/device-container";
import LoginContainer from "./login/login"
import Chatroom from "./chat/chatroom";


import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';


class App extends React.Component {


    render() {

        return (
            <div className={styles.back}>
                <Router>
                    <div>
                        <div>
                            <Switch>
                                <Route
                                    exact
                                    path='/'
                                    render={() => <LoginContainer/>}
                                />

                                <Route
                                    exact
                                    path='/home'
                                    render={() => <Home/>}
                                />
                            </Switch>
                        </div>
                        <div>
                            <NavigationBar/>
                            <Switch>

                                <Route
                                    exact
                                    path='/admin/manageUsers'
                                    render={() => <UserContainer/>}
                                />

                                <Route
                                    exact
                                    path='/admin/manageDevices'
                                    render={() => <DeviceContainer/>}
                                />

                                <Route
                                    exact
                                    path='/chat'
                                    render={() => <Chatroom/>}
                                />

                                {/*Error*/}
                                <Route
                                    exact
                                    path='/error'
                                    render={() => <ErrorPage/>}
                                />

                                <Route render={() => <ErrorPage/>}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        )
    };
}

export default App
