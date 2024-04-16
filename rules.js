class Start extends Scene {
    create() {
        // Set the title using the story data
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }
    

    handleChoice() {
        // Navigate to the initial location of the story
        const initialLocation = this.engine.storyData.InitialLocation;
        this.engine.gotoScene(Location, initialLocation);
    }
    
}

class Location extends Scene {
    create(key) {
        // Retrieve the location data using the provided key
        let locationData = this.engine.storyData.Locations[key];
    
        // Display the body text of the current location
        this.engine.show(locationData.Body);
    
        // Check if there are any choices in the location data
        if (locationData.Choices && locationData.Choices.length > 0) {
            // Loop over the location's choices
            for (let choice of locationData.Choices) {
                // Add each choice using the text and a callback function that passes the target location to handleChoice
                this.engine.addChoice(choice.Text, choice.Target);
            }
        } else {
            // If there are no choices, add a "The end." option
            this.engine.addChoice("The end.");
        }
    }
    
    

    handleChoice(targetLocation) {
        if (targetLocation) {
            // Navigate to the next location using the target location as the key
            this.engine.gotoScene(Location, targetLocation);
        } else {
            // If there's no target location, navigate to the end scene
            this.engine.gotoScene(End);
        }
    }
    
    
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');