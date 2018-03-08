import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-client-preset'
import { createUploadLink } from 'apollo-upload-client'

import UploadFile from './components/UploadFile'

import './index.css'

const authLink = new ApolloLink((operation, forward) => {
  const token = JSON.parse(localStorage.getItem('AUTH_TOKEN'))
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation)
})

const client = new ApolloClient({
  link: authLink.concat(createUploadLink({ uri: 'http://localhost:4000' })),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <React.Fragment>
        <div>
          <Switch>
            <Route exact path='/' component={UploadFile} />
          </Switch>
        </div>
      </React.Fragment>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
