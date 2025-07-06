// questionMap.js
import htmlFrontend from './app/questions/frontend/htmlquestions';
import cssFrontend from './app/questions/frontend/cssquestions';
import javascriptFrontend from './app/questions/frontend/javascriptquestions';
import reactFrontend from './app/questions/frontend/reactjsquestions';

import nodeBackend from './app/questions/backend/nodejsquestions';
import dotnetBackend from './app/questions/backend/dotnetquestions';

import htmlFullstack from './app/questions/fullstack/htmlquestions';
import cssFullstack from './app/questions/fullstack/cssquestions';
import jsFullstack from './app/questions/fullstack/javascriptquestions';
import reactFullstack from './app/questions/fullstack/reactjsquestions';
import nodeFullstack from './app/questions/fullstack/nodejsquestions';
import dotnetFullstack from './app/questions/fullstack/dotnetquestions';

export const questionMap = {
  frontend: {
    html: htmlFrontend,
    css: cssFrontend,
    javascript: javascriptFrontend,
    'react js': reactFrontend,
  },
  backend: {
    'node js': nodeBackend,
    dotnet: dotnetBackend,
  },
  fullstack: {
    html: htmlFullstack,
    css: cssFullstack,
    javascript: jsFullstack,
    'react js': reactFullstack,
    'node js': nodeFullstack,
    dotnet: dotnetFullstack,
  },
};
