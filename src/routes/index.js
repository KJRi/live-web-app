// @flow
// We only need to import the modules necessary for initial render
import Home from './Home'
import Personal from './Personal'
import Circle from './Circle'
import Detail from './Detail'

// Force import during development to enable Hot-Module Replacement
// not need ?
// if (__DEV__) {
//   require('./Home/components/HomeView');
//   require('./GithubRepos/container/GithubRepos');
//   require('./Counter');
// }

export default {
  home: Home,
  circle: Circle,
  personal: Personal,
  detail: Detail
}
