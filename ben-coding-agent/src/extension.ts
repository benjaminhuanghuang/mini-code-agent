// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { AgentWebViewProvider } from "./AgentWebViewProvider";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const provider = new AgentWebViewProvider(context);
  // show webview
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "ben-coding-agent.SidebarProvider",
      provider
    )
  );

  // send message to backend
  context.subscriptions.push(
    vscode.commands.registerCommand("ben-coding-agent.helloWorld", () => {
      provider.postMessage("Hello World from Ben Coding Agent!");
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
