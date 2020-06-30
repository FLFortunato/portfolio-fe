import React from 'react';
import { Router, Switch, Route } from 'react-router';
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
  ];

  return (
    <div>
      <Header />
      <Router history={history}>
        <Switch>
          {publicRoutes.map((route) => {
            return (
              <Route exact component={route.component} path={route.path} />
            );
          })}
          {privateRoutes.map((route) => {
            return (
              <PrivateRoute
                exact
                component={route.component}
                path={route.path}
              />
            );
          })}
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};
