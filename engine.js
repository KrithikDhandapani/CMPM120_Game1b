class Engine {
    // Static method to load the engine once the window is ready
    static load(firstSceneClass, storyDataUrl) {
        // The window.onload function ensures the game starts when the document is fully loaded
        window.onload = () => new Engine(firstSceneClass, storyDataUrl);
    }

    constructor(firstSceneClass, storyDataUrl) {
        // Store the initial scene class and story data URL
        this.firstSceneClass = firstSceneClass;
        this.storyDataUrl = storyDataUrl;

        // Create header, output, and actions container elements in the document
        this.header = document.body.appendChild(document.createElement("h1"));
        this.output = document.body.appendChild(document.createElement("div"));
        this.actionsContainer = document.body.appendChild(document.createElement("div"));

        // Fetch story data from the specified URL
        fetch(storyDataUrl)
            .then(response => response.json())
            .then(json => {
                this.storyData = json;
                this.gotoScene(firstSceneClass);
            });
    }

    // Transition to a new scene
    gotoScene(sceneClass, data = null) {
        this.output.innerHTML = '';
        this.actionsContainer.innerHTML = '';

        this.scene = new sceneClass(this);
        this.scene.create(data);
    }

    // Method to set the title of the document and header
    setTitle(title) {
        document.title = title;
        this.header.innerText = title;
    }

    // Method to append text to the output container
    show(text) {
        const div = document.createElement("div");
        div.innerHTML = text;
        this.output.appendChild(div);
    }

    // Method to add a choice button to the actions container
    addChoice(text, data) {
        const button = document.createElement("button");
        button.innerText = text;

        button.onclick = () => {
            while (this.actionsContainer.firstChild) {
                this.actionsContainer.removeChild(this.actionsContainer.firstChild);
            }
            this.scene.handleChoice(data);
        };

        this.actionsContainer.appendChild(button);
    }
}

class Scene {
    constructor(engine) {
        this.engine = engine;
        this.storyData = engine.storyData;
    }

    // Called when a scene is first presented to the player
    create(data) {
        // Subclasses should override this method to define scene setup
        // Use `data` to customize the scene based on the provided context
    }

    // Called when the player has selected a choice button
    handleChoice(data) {
        // Subclasses should override this method to handle choices made by the player
        // The default implementation provides a warning to indicate that subclasses should implement it
        console.warn('No choice handler on scene', this);
    }
}
