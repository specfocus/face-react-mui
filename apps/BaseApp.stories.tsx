import { testDataProvider } from '@specfocus/view-focus.data/providers/testDataProvider';
import { Resource } from '@specfocus/view-focus/resources/Resource';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { BaseApp } from './BaseApp';

export default {
  title: '@specfocus/view-focus.mui/BaseRoot',
};

const PostList = () => <h1>Post List</h1>;
const CommentList = () => <h1>Comment List</h1>;

export const Basic = () => (
  <BaseApp dataProvider={testDataProvider()}>
    <Resource name="posts" list={PostList} />
    <Resource name="comments" list={CommentList} />
  </BaseApp>
);

export const InsideRouter = () => (
  <MemoryRouter>
    <BaseApp dataProvider={testDataProvider()}>
      <Resource name="posts" list={PostList} />
      <Resource name="comments" list={CommentList} />
    </BaseApp>
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
          <BaseApp dataProvider={testDataProvider()} basename="/admin">
            <Resource name="posts" list={PostList} />
            <Resource name="comments" list={CommentList} />
          </BaseApp>
        }
      />
    </Routes>
  </MemoryRouter>
);
