document.addEventListener("DOMContentLoaded", () => {
    // Query the root element
    let elements = document.querySelector("#elements");

    // Our simple sandboxed statement is to set the color according to the index
    let itemRenderer = createSandboxedStatements({
        code: `element.classList.add(index % 2 == 0 ? 'green' : 'red');`,
        parameters: ["index", "element"]
    });

    // We will make a few iterations to get a good amount of data
    for (let i = 0; i < 1000; i++) {
        // Create element to append
        const paragraph = document.createElement("div");
        paragraph.classList.add("element");

        // Mark in dev tools before render
        window.performance.mark("beforeRender");

        // Execute sandboxed function, if an error occurs simply alert it and stop rendering
        try {
            itemRenderer(i, paragraph);
        } catch (e) {
            alert(e)
            break;
        } finally {
            // Mark end of rendering, no matter if it was successful or not
            window.performance.mark("afterRender");

            // Measure time for rendering
            window.performance.measure("renderingTime", "beforeRender", "afterRender");
        }

        // Append generate element to root container
        elements.appendChild(paragraph);
    }
});
