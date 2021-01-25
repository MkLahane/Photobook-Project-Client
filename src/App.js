import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import React from 'react';
import HistoryContext from './contexts/HistoryContext';
import { AuthProvider } from './contexts/AuthContext';
import History from './components/History';
import jwtDecode from 'jwt-decode';
import AuthRoute from './components/AuthRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RegistrationConfirmation from './pages/RegistrationConfirmation';
import AddPhotobook from './pages/AddPhotobook';
import { SlideIndexProvider } from './contexts/SlideContext';
import Photobook from './pages/Photobook';
import { REACT_APP_API_KEY } from './config';


const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_APP_URL}/graphql`
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    const { exp } = jwtDecode(token);
    const expirationTime = (exp * 1000) - 60000; //Refresh a minute early to avoid latency issues
    if (Date.now() >= expirationTime) {
      localStorage.clear();
      History.push('/login');
    }
  }
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <HistoryContext.Provider value={History}>
          <SlideIndexProvider>
            <Router history={History}>
              <Navbar />

              <Route exact path='/' component={Home}></Route>
              <AuthRoute exact path='/login' component={Login} />
              <AuthRoute exact path='/register' component={Register} />
              <AuthRoute exact path='/addphotobook' inverse={true} component={AddPhotobook} />
              <Route exact path='/confirmation/:token' component={RegistrationConfirmation}></Route>
              <AuthRoute exact path='/photobook/:id' inverse={true} component={Photobook}></AuthRoute>
            </Router>
          </SlideIndexProvider>
        </HistoryContext.Provider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
