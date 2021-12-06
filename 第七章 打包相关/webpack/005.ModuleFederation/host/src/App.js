import React from "react";
import Slides from './Slides';
const RemoteNewsList = React.lazy(() => import("remote_appOne_remoteEntry/NewsList"));

const App = () => (
    <div>
        <h2 >本地组件Slides, 远程组件NewsList</h2>
        <Slides />
        <React.Suspense fallback="Loading NewsList">
            <RemoteNewsList />
        </React.Suspense>
    </div>
);
export default App;