# SWAPI Game

Welcome to the SWAPI Game, an engaging card comparison game that utilizes the Star Wars API (SWAPI) to pit two randomly selected entities against each other. In this game, you are presented with two cards, each representing a person or a starship from the Star Wars universe. Your task is to compare these cards based on their attributes to determine the round's winner.

## Features

- **Choose Your Category**: Before the game begins, you can select whether you'd like to compare people or starships, providing a customized gameplay experience based on your preferences.

- **Game Modes**: Participate in a single round to quickly determine a winner, or choose the double mode, which includes five rounds for an extended gameplay experience.

- **Dynamic Comparison**: Each round dynamically compares the relevant attributes of the two cards (e.g., mass for people or crew size for starships) to declare a winner.

## Getting Started

To start playing the SWAPI Game, simply clone this repository or visit [SWAPI Game](https://swapii-game.netlify.app).

## How to Play

1. **Select a Category**: Choose between 'Person' or 'Starship' to set the type of entities you'll be comparing.

2. **Choose Game Mode**: Decide if you want a quick match (Single Round) or a more extended challenge (Double - 5 Rounds).

3. **Start the Game**: Press the 'Play Game' button to begin.

4. **Determine the Winner**: The game automatically compares the cards after each round and informs you of the round's winner.

## Project Technical Description

This project is developed with **Angular 17** and **Angular Material** for UI components.
## Code Organization

The codebase is organized by technical usage to ensure clarity and ease of navigation. For example:

- Components are stored within the `components` directory. Each component, such as `person-card.component.ts`, is clearly named to reflect its purpose and functionality.

## API Integration

Upon starting the game, the application makes API calls to fetch necessary data for each player. This action is triggered by the user clicking the "Start Game" button, seamlessly integrating external data into the gameplay.

## Tests

The project includes unit tests for various functionalities and Cypress end-to-end (e2e) tests.
