// @flow
// We only need to import the modules necessary for initial render
import Home from './Home'
import Personal from './Personal'
import Circle from './Circle'
import Detail from './Detail'
import Login from './Login'
import Register from './Register'

// Force import during development to enable Hot-Module Replacement
// not need ?

export default {
  register: Register,
  login: Login,
  home: Home,
  circle: Circle,
  personal: Personal,
  detail: Detail
}
