import {applyMiddleware, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'

import apiMiddleware from './middleware/api'

import appApp from './reducers/index'

const loggerMiddleware = createLogger()

export default function configureStore (preloadedState) {
  const middlewares = [thunkMiddleware, loggerMiddleware, apiMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]

  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(appApp, preloadedState, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(appApp)
    )
  }

  return store
}
