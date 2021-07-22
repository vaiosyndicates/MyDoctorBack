import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
import { Sidebar } from './components/atom';
import { Article, Dashboard, FormArticle, FormArticleEdit, FormHospital, FormHospitalEdit, Hospital, Login, Register} from './page';
import { AuthContext } from './context';
import PrivateRoute from './route/PrivateRoute';

const App = () => {

  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  
  const setTokens = data => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);  
    if((data === 'undefined') || (data === null) || (data === '')) {
      window.localStorage.clear();
    }
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens}}>
      <BrowserRouter>
        <div className="box-dashboards">
          <Switch>
              <Route exact path="/" render={() => (
                authTokens && authTokens !== 'undefined' && authTokens !== null && authTokens !== '' ? (
                  <>
                    <Route component={Sidebar} />
                    <Dashboard/>
                  </>
                ) : (
                  <Login />
                )
              )}/>
              <Route exact path="/register" component={Register} />
              <Route component={Sidebar} />
          </Switch>
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/article" component={Article} />
          <PrivateRoute path="/addarticle" component={FormArticle} />
          <PrivateRoute path="/editarticle/:id" component={FormArticleEdit} />
          <PrivateRoute path="/hospital" component={Hospital} />
          <PrivateRoute path="/addhospital" component={FormHospital} />
          <PrivateRoute path="/edithospital/:id" component={FormHospitalEdit} />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))