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
```

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
