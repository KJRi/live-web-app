import {loginFlow, registerFlow, user_auth} from './homeSaga'

export default function* rootSaga() {
    yield  fork(loginFlow);
    yield  fork(registerFlow);
    yield  fork(user_auth);
    // yield fork(get_all_users_flow);
    // yield fork(getAllTagsFlow);
    // yield fork(addTagFlow);
    // yield fork(delTagFlow);
    // yield fork(saveArticleFlow);
    // yield fork(getArticleListFlow);
    // yield fork(deleteArticleFlow);
    // yield fork(getArticlesListFlow);
    // yield fork(getArticleDetailFlow);
    // yield fork(editArticleFlow);
}
