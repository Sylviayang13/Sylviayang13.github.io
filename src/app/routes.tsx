import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { Level } from './pages/Level';
import { PoetryDetail } from './pages/PoetryDetail';
import { Collection } from './pages/Collection';
import { Quiz } from './pages/Quiz';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'level/:level', Component: Level },
      { path: 'poem/:id', Component: PoetryDetail },
      { path: 'collection', Component: Collection },
      { path: 'quiz', Component: Quiz },
      { path: '*', Component: NotFound },
    ],
  },
]);
