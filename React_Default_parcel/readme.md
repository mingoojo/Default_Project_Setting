<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">REACT 기본설정 프로젝트 (24.06.12) - node version 20.11.1</h3>

---

#### <p align="center"> React + TypeScript + Jest + ESLint ver 8 + Parcel 기준 세팅 방법입니다.</p>


## 🧐 About <a name = "about"></a>

- 리엑트 프로젝트 생성의 기반이 되는 프로젝트를 만듭니다. 추후에 리엑트로 프로젝트를 생성시 이 프로젝트를 기준으로 합니다.
- 추후 라이브러리가 업데이트시 수정될 수 있습니다.

## 🏁 프로젝트 생성법 <a name = "getting_started"></a>

##### 이프로젝트는 react-creact-app을 활용하지 않고, 처음부터 직접 세팅합니다.

기본 세팅은 다음과 같습니다.

- [REACT](https://ko.legacy.reactjs.org/)
- [ESLINT](https://eslint.org/blog/2024/02/eslint-v8.57.0-released/)
  - 8.57버전 기준입니다. mjs파일이 아닌 eslintrc.js를 기준으로합니다. eslint.config.mjs는 아직 리엑트와의 호완도 떨어지고, vscode의 린팅과도 호완이 떨어져 추후에 적용하려합니다.
- [TYPESCRIPT](https://www.typescriptlang.org/ko/docs/handbook/react.html) - react typescript
- [JEST](https://jestjs.io/)
- [PARCEL](https://parceljs.org/)

****
<br/>

### Installing

<br/>

##### 1. NODEJS설치

```
npm init -y
```

- package.json을 생성하는 명령어
- npm : Node Package Manager로 node.js에서 사용하는 모듈을 관리하고 배포하는 역할을 함.

[npm init에 대한 참고 사이트](https://velog.io/@clean01/Npm-npm-init%EC%9D%98-%EC%9D%98%EB%AF%B8#:~:text=npm%20init%EC%9D%80%20package.json,%EC%9C%84%ED%95%B4%20%EC%9E%85%EB%A0%A5%ED%95%98%EB%8A%94%20%EC%BB%A4%EB%A7%A8%EB%93%9C%EC%9D%B4%EB%8B%A4.)

<br/>


##### 1-1. .vscode, .npmrc 생성

- 간편한 환경을 구축을 위해 아래의 파일들을 먼저 설정한다.

```
touch .npmrc
```

<br/>

- npmrc는 아래와 같이 작성한다.

<br/>

```
legacy-peer-deps=true
force=true
```

<br/>

- .vscode도 생성한다

```
mkdir .vscode
```
```
touch .vscode/settings.json
touch .vscode/launch.json
```

<br/>

```
//settings.jcon
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.alwaysShowStatus": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.workingDirectories": [{ "mode": "auto" }],
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "typescriptreact"
  ],
  "[html]": {
    "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
  },
  "[markdown]": {
    "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
  }
  // "eslint.experimental": {
  //   "useFlatConfig": true
  // },
  // "eslint.options": {
  //   "overrideConfigFile": "eslint.config.mjs"
  // }
}
```

<br/>

```
//launch.jcon
{
  // IntelliSense를 사용하여 가능한 특성에 대해 알아보세요.
  // 기존 특성에 대한 설명을 보려면 가리킵니다.
  // 자세한 내용을 보려면 https://go.microsoft.com/fwlink/?linkid=830387을(를) 방문하세요.
  "version": "0.2.0",
  "configurations": [
    {
      "command": "npm start",
      "name": "Run npm start",
      "request": "launch",
      "type": "node-terminal"
    },

    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}"
    }
  ]
}

```

##### 2. gitignore 파일 생성

```
touch .gitignore
```
<br/>

- .gitignore 파일을 생성하는 명령어
- 내용은 아래의 코드를 넣자

<br/>

```

# dependencies
/node_modules

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

<br/>

##### 3. TYPESCRIPT 설치하기

```
npm install -D typescript
npx tsc --init
```
<br/>

- 설치후 tsconfig.json이라는 파일이 생성됨
- 'tsconfig.json' 파일의 jsx속성을 변경한다 ("jsx": "react-jsx")
- 'tsconfig.json' 파일의 types속성을 변경한다 ("types": ["@testing-library/jest-dom"])

<br/>

```
"target": "es2016": JavaScript로 컴파일되는 대상 ECMAScript 버전을 설정합니다. 여기서는 ECMAScript 2016(ES7)을 지정하고 있습니다.

"jsx": "react-jsx": JSX 코드를 어떻게 생성할지를 지정합니다. 여기서는 React의 JSX 코드를 생성하기 위해 설정되었습니다.

"module": "commonjs": 모듈 코드를 어떻게 생성할지를 지정합니다. 여기서는 CommonJS 모듈 시스템을 사용하도록 설정되었습니다.

"esModuleInterop": true: CommonJS 모듈을 가져올 때 추가적인 JavaScript를 생성하여 CommonJS 모듈을 더 쉽게 가져올 수 있도록 합니다. 이는 allowSyntheticDefaultImports를 사용하여 타입 호환성을 활성화합니다.

"forceConsistentCasingInFileNames": true: 파일 이름에서 대소문자를 일관되게 유지하도록 강제합니다.

"strict": true: 모든 엄격한 타입 검사 옵션을 활성화합니다. 이것은 noImplicitAny, strictNullChecks, strictFunctionTypes 등의 옵션을 모두 활성화하는 단축키입니다.

"skipLibCheck": true: 모든 .d.ts 파일의 타입 검사를 건너뜁니다. 보통 이 옵션은 성능을 향상시키기 위해 사용되며, 프로젝트가 사용하는 외부 라이브러리의 타입을 직접 정의하는 경우에만 필요합니다.
```

<br/>

##### 4. ESlint 설치

```
npm install -D eslint@8.57
npx eslint --init
```

<br/>

- 'npx eslint --init'의 선택사항을 적절히 선택해주고, 개발환경을 구축한다.
- '.eslintrc.js' 파일에 'jest:true'를 잡아준다! '.eslintignore'파일을 작성한다.

```
//.eslintignore
/index.html
/node_modules/,
/dist/,
/.parcel-cache/
```

<br/>

##### 추가로 아래의 항목도 설치한다

```
npm install -D @typescript-eslint/parser
npm install -D @typescript-eslint/eslint-plugin
npm install -D typescript-eslint
```
- .eslintrc.js는 아래의 파일로 작성한다.
```
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true, // jest사용을 위한 추가
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
  ],
  rules: {
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/indent": ["error", 2],
    "react/react-in-jsx-scope": "off",
    "linebreak-style": 0,
    indent: ["error", 2],
    "no-trailing-spaces": "error",
    curly: "error",
    "brace-style": "error",
    "no-multi-spaces": "error",
    "space-infix-ops": "error",
    "space-unary-ops": "error",
    "no-whitespace-before-property": "error",
    "func-call-spacing": "error",
    "space-before-blocks": "error",
    "keyword-spacing": ["error", { before: true, after: true }],
    "comma-spacing": ["error", { before: false, after: true }],
    "comma-style": ["error", "last"],
    "comma-dangle": ["error", "always-multiline"],
    "space-in-parens": ["error", "never"],
    "block-spacing": "error",
    "array-bracket-spacing": ["error", "never"],
    "key-spacing": ["error", { mode: "strict" }],
    "arrow-spacing": ["error", { before: true, after: true }],
    quotes: ["warn", "double"],
    eqeqeq: "warn",
    "no-delete-var": "warn",
    "no-unused-vars": "warn",
    "object-curly-spacing": ["error", "always"],
    "jsx-quotes": ["error", "prefer-double"],
    "max-params": ["error", 10],
  },
};
```

<br/>

##### 5. REACT 설치

```
npm install react react-dom
npm install -D @types/react @types/react-dom
```
<br/>

##### 6. JEST 설치
- 만드는 날 기준으로 @testing-library/react가 14버전이 에러가 안난다. 나중에 바뀔지도??

```
npm i -D jest @types/jest @swc/core @swc/jest \
    jest-environment-jsdom \
    @testing-library/react@release-14.x @testing-library/jest-dom
```

- jest.config.js파일 생성 후 세팅한다.
```
touch jest.config.js
```
- 내용은 아래와 같이 작성한다
- [jest.config.js](https://github.com/ahastudio/CodingLife/blob/main/20220726/react/jest.config.js)

<br/>

##### 7. PARCEL 설치

```
npm install -D parcel
```

- 'package.json'의 scripts, source 부분을 수정한다. ( "source": "./index.html" 도 반드시 추가한다.)
- [package.json](https://github.com/ahastudio/CodingLife/blob/main/20220726/react/package.json)

<br/>


parcel을 설치후에 image를 사용하기 위한 static폴더를 생성한다.
```
mkdir static
```

static폴더를 사용하기 위한 라이브러리를 추가한다.
```
npm install parcel-reporter-static-files-copy
```

parcelrc파일을 생성한다.
```
touch .parcelrc
```

parcelrc파일을 작성한다.
```
{
  "extends": "@parcel/config-default",
  "reporters": [
    "...",
    "parcel-reporter-static-files-copy"
  ]
}
```

폴더명을 static이 아닌 다른 이름을 쓰고 싶다면 package.json에 다음을 추가한다.
```
"staticFiles": {
  "staticPath": "public" //폴더명
}
```


##### 8. 파일 설정

```
touch index.html
touch src/main.tsx
```

- index.html은 아래와 같이 작성한다
```
//index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="./src/main.tsx"></script>
</body>
</html>
```
- main.tsx는 다음과 같이 작성한다.
```
//main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
 return(
  <div>
   hello world!
  </div>
 )
}

function main() {
  const element = document.getElementById('root');

  if (!element) {
    return;
  }

  const root = ReactDOM.createRoot(element);

  root.render((<App />));
}

main();
```
