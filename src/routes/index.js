// @flow
// We only need to import the modules necessary for initial render
import Home from './Home'
import Personal from './Personal'
import Circle from './Circle'
import Detail from './Detail'
import Login from './Login'
import Register from './Register'
import EditPost from './EditPost'

// Force import during development to enable Hot-Module Replacement
// not need ?

export default {
  register: Register,
  editPost: EditPost,
  login: Login,
  home: Home,
  circle: Circle,
  personal: Personal,
  detail: Detail
}
