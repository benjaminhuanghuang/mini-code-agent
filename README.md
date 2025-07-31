# 从零开始开发自己的 cursor

https://www.bilibili.com/video/BV1DVgczfE6Z

## Init project

```sh
# https://code.visualstudio.com/api/get-started/your-first-extension

npm install --global yo generator-code

yo code
  ts
  esbuild
  pnpm


cd project-root
pnpm approve-builds
  select esbuild
  approve = true
```

- Trouble shooting

Delete

```json
"preLaunchTask": "${defaultBuildTask}"
```

Build project

```sh
pnpm run compile
```

## Start the extension

Menu bar -> Run -> Start debugging

## Add React project as the UI part

```sh
npm create vite
```

Add react project pnpm-workspace.yaml

Add ben-coding-agent/package.json

```json
"viewsContainers": {
      "activitybar": [
        {
          "id": "ben-coding-agent",
          "title": "Ben Coding Agent",
          "icon": "media/icon.png"
        }
      ]
    },
    "views": {
      "ben-coding-agent": [
        {
          "type": "webview",
          "id": "bin-coding-agent.SidebarProvider",
          "name": "%views.sidebar.name%"
        }
      ]
    }
```

Modify ben-coding-agent/src/extension.ts

```js
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "ben-coding-agent.SidebarProvider",
      new AgentWebViewProvider(context)
    )
  );
}
```

Implement resolveWebviewView in src/AgentWebViewProvider.ts

Modify ben-coding-agent/agent-webview/vite.config.ts, tell vite don't add hash to the filenames

## Post message

```sh
pnpm --filter agent-webview add react-use
pnpm --filter agent-webview add @types/vscode-webview
```
