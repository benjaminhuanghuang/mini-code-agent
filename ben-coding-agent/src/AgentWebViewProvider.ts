import * as vscode from "vscode";

export class AgentWebViewProvider implements vscode.WebviewViewProvider {
  private webview?: vscode.Webview;
  constructor(private context: vscode.ExtensionContext) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    token: vscode.CancellationToken
  ): Thenable<void> | void {
    this.webview = webviewView.webview;
    const scriptUrl = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        "agent-webview",
        "dist",
        "assets",
        "index.js"
      )
    );

    const styleUrl = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        "agent-webview",
        "dist",
        "assets",
        "index.css"
      )
    );
    webviewView.webview.options = {
      enableScripts: true, // Enable JavaScript in the webview
    };
    webviewView.webview.html = this.getWebviewContent(scriptUrl, styleUrl);

    // Listen for messages from the webview
    webviewView.webview.onDidReceiveMessage((message: string) => {
      vscode.window.showInformationMessage(message);
    });
  }

  private getWebviewContent(
    scriptUrl: vscode.Uri,
    styleUrl: vscode.Uri
  ): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ben Coding Agent</title>
        <script type="module" src="${scriptUrl}"></script>
        <link rel="stylesheet" href="${styleUrl}">
    </head>
    <body>
       <div id="root"></div>
    </body>
    </html>`;
  }

  postMessage(message: string) {
    this.webview?.postMessage(message);
  }
}
