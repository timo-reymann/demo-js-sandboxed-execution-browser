/**
*  Compile the given inlined code to valid javascript,
*  wraped into an iframe as execution context
*/
function createSandboxedStatements(args) {
    // Get code to wrap from arguments
    const code = args.code || "";

    // Get parameters and fallback to empty list
    const parameters = args.parameters || [];

    // Create sandbox frame
    sandboxFrame = document.createElement("iframe");
    document.body.appendChild(sandboxFrame);

    // Update the attributes, no matter if the element is existing or not
    sandboxFrame.src = "data:text/html;";
    sandboxFrame.sandbox = "allow-scripts allow-same-origin";
    sandboxFrame.style.display = "none";

    // Create sandboxed function
    const sandboxFunction = new sandboxFrame.contentWindow.Function(
        ...parameters,
        `'use strict'; ${code}`
    );

    // Remove iframe from dom
    sandboxFrame.remove();

    // Dereference iframe
    sandboxFrame = null;

    // Return wrapped sandbox function
    return sandboxFunction;
}
