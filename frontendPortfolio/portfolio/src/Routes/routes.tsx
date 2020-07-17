import React, { useEffect } from 'react';
import { Router, Switch, Route, withRouter } from 'react-router';
import { history } from '../history';
import { Home } from '../components/Pages/home/home';
import { About } from '../components/Pages/about/about';
import { Projects } from '../components/Pages/projects/projects';
import { Contact } from '../components/Pages/contact/contact';
import { Login } from '../components/Pages/login/login.page';
import { Register } from '../components/Pages/register/register.page';
import { PrivateRoute } from './privateRoutesComponent';
import { Profile } from '../components/Pages/profile/profile.page';
import { Pages } from '../models/enum/enum';
import { TodoListApp } from '../components/Pages/projects/todoList/todoList.project';
import { Footer } from '../components/Pages/siteStructures/footer/footer';
import { Header } from '../components/Pages/siteStructures/header/header';
import { Posts } from '../components/Pages/projects/posts/post';
import { ForgotPassPage } from '../components/Pages/forgotPass/forgotPass';
import { ResetPassPage } from '../components/Pages/resetPass/resetPass';
import { ShoppingList } from '../components/Pages/projects/shoppingList/shoppingList';
import {TableFrag} from '../components/Pages/projects/tables/tables'

export const Routes = () => {
  const publicRoutes = [
    {
      component: Login,
      path: Pages.Login,
    },
    {
      component: Register,
      path: Pages.Register,
    },
    {
      component: ForgotPassPage,
      path: Pages.Forgot,
    },
    {
      component: ResetPassPage,
      path: Pages.ResetPass,
    },
    {
      component: ShoppingList,
      path: Pages.ShoppingList,
    },
    {
      component: TableFrag,
      path: Pages.Table,
    },
  ];

  const privateRoutes = [
    {
      component: Home,
      path: Pages.Home,
    },
    {
      component: About,
      path: Pages.About,
    },
    {
      component: Projects,
      path: Pages.Projects,
    },
    {
      component: Contact,
      path: Pages.Contact,
    },
    {
      component: Profile,
      path: Pages.Profile,
    },
    {
      component: TodoListApp,
      path: Pages.TodoList,
    },
    {
      component: Posts,
      path: Pages.Posts,
    },
    {
      component: ShoppingList,
      path: Pages.ShoppingList,
    },
  ];

  const Main = withRouter(({ location }) => {
    return (
      <div>
        {location.pathname !== Pages.Login &&
        location.pathname !== Pages.Register &&
        location.pathname !== Pages.ResetPass &&
        location.pathname !== Pages.Forgot ? (
          <Header />
        ) : undefined}

        <Switch>
          {publicRoutes.map((route, i) => {
            return (
              <Route
                key={i}
                exact
                component={route.component}
                path={route.path}
              />
            );
          })}
          {privateRoutes.map((route, i) => {
            return (
              <PrivateRoute
                key={i}
                exact
                component={route.component}
                path={route.path}
              />
            );
          })}
        </Switch>

        {location.pathname !== Pages.Login &&
        location.pathname !== Pages.Register &&
        location.pathname !== Pages.ResetPass &&
        location.pathname !== Pages.Forgot ? (
          <Footer />
        ) : undefined}
      </div>
    );
  });

  return (
    <Router history={history}>
      <Main />
    </Router>
  );
};
