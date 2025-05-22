# Notes App Using Web Components

## Overview

This Notes App is a simple web application that allows users to create, and view notes. The app is built using Web Components, featuring custom elements for adding notes and displaying a list of notes.

## Features

- **Add Notes**: Users can input a title and body for each note. The app validates the input to ensure that the title is at least 3 characters long and the body is at least 10 characters long.
- **Display Notes**: All created notes are displayed in a list format with their titles, creation dates, and content.

## Components

### 1. NoteInput

The `NoteInput` component is responsible for rendering a form that captures the title and body of a note. It includes:

- **Input Validation**: Ensures that the title and body meet the required character lengths before allowing submission.
- **Event Handling**: Dispatches a custom event (`note-submit`) when a note is successfully created.

### 2. NoteItem

The NoteItem component represents a single note. It displays the title, creation date, and body of the note.

### 3. NoteList

The NoteList component manages the collection of notes. It listens for the note-submit event from NoteInput and updates its display accordingly.

## Usage

To use the Notes App, include the following HTML structure in your web page:

```html
<note-input></note-input> <note-list></note-list>
```

## Connecting Components

Ensure that the NoteInput and NoteList components are connected properly to handle note submissions:

```javascript
const noteList = document.querySelector("note-list");
const noteInput = document.querySelector("note-input");

noteInput.addEventListener("note-submit", (event) => {
  const newNote = {
    id: Date.now().toString(),
    title: event.detail.title,
    body: event.detail.body,
    createdAt: new Date().toISOString(),
  };
  noteList.notes = [...noteList.notes, newNote];
});
```

## Conclusion

This Notes App demonstrates the use of Web Components to create a simple yet functional application for managing notes. It can be further enhanced with features like local storage, categorization, and editing capabilities.
