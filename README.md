# Implementation Overview

## Imports and Setup:

- Import necessary React hooks and components from `@tldraw/tldraw`.
- Define the `TimelineEvent` interface to structure the timeline events.

## Component State:

- Use `useState` to manage `inputText` for the textarea and `editor` for the Tldraw editor instance.

## Handle Input Change:

- `handleInputChange` updates `inputText` state when the textarea content changes.

## Parse Input:

- `parseInput` function processes the input text to extract timeline events.
  - Splits input into lines, matches dates, and creates `TimelineEvent` objects.
  - Removes the year from the description and sorts events by date.

## Generate Timeline:

- `generateTimeline` function uses the Tldraw editor to create a visual timeline.
  - Clears existing shapes, parses input text, and creates shapes for the timeline.
  - Draws a horizontal line, dots for events, labels, and connecting lines.

## Render Component:

- Renders a textarea for input and a button to generate the timeline.
- Displays the Tldraw editor and sets the editor instance on mount.

# Alai Coding Challenge: TLDraw Timeline Implementation

Welcome to the Alai Coding Challenge! This project is set up with React, TypeScript, and TLDraw.

## Challenge Overview

Your task is to create a timeline component using TLDraw, similar to the one found on https://getalai.com/. You will also need to implement a user input feature to dynamically generate timeline elements.

## Tasks

1. Create a timeline element using TLDraw similar to what you can see on https://getalai.com/
   ![Timeline Example](./src/assets/timeline.png)

2. Add an input field where the user can enter desired number of items and a generate button. When the user clicks generate,
   then the timeline element should show that many number of elements.

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Project Structure

- `src/App.tsx`: Main application component
- `src/TldrawComponent.tsx`: TLDraw canvas implementation (You'll likely need to modify this)

## Evaluation Criteria

- Feature completion: All required features are fully implemented and functional.
- Code quality and organization
- Proper use of React, TypeScript, and TLDraw

## Submission

Please create a private repo for your submission to avoid leaking the solution. Add our emails (krishna@getalai.com and anmol@getalai.com) when you're ready for review.
Include a brief description of your approach and any challenges you faced.

## Resources

- [TLDraw Documentation](https://tldraw.dev/)
- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

Good luck, and we look forward to seeing your implementation!
