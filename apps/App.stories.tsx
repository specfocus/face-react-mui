import { Resource } from '@specfocus/view-focus/resources/Resource';
import { testDataProvider } from '@specfocus/view-focus.data/providers/testDataProvider';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';

export default {
  title: '@specfocus/view-focus.mui/Admin',
};

const PostList = () => <h1>Post List</h1>;
const CommentList = () => <h1>Comment List</h1>;

export const Basic = () => (
  <App dataProvider={testDataProvider()}>
    <Resource name="posts" list={PostList} />
    <Resource name="comments" list={CommentList} />
  </App>
);

export const InsideRouter = () => (
  <MemoryRouter>
    <App dataProvider={testDataProvider()}>
      <Resource name="posts" list={PostList} />
      <Resource name="comments" list={CommentList} />
    </App>
  </MemoryRouter>
);

export const SubPath = () => (
  <MemoryRouter>
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Main</h1>
            <div>
              <Link to="/admin">Go to admin</Link>
            </div>
          </>
        }
      />
      <Route
        path="/admin/*"
        element={
          <App dataProvider={testDataProvider()} basename="/admin">
            <Resource name="posts" list={PostList} />
            <Resource name="comments" list={CommentList} />
          </App>
        }
      />
    </Routes>
  </MemoryRouter>
);
