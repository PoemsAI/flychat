import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import rootReducer from '../reducers/index'

function configStore() {
  return createStore(rootReducer, applyMiddleware(thunk))
}

export default configStore()

