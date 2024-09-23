document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.querySelector('input[type="text"]');
    const addNoteBtn = document.querySelector('.btn1');
    const notesContainer = document.querySelector('.notes-container');
    let notes = loadNotesFromLocalStorage(); 

    function addNote() {
        const inputValue = inputField.value.trim();
        if (inputValue !== '') {
            const note = {
                text: inputValue,
                width: "100%",
                height: "50%",
            };
            notes.push(note);
            saveNotesToLocalStorage(); // Save to localStorage after adding

            // Create and animate the new note
            const noteElement = createNoteElement(note, notes.length - 1);
            notesContainer.appendChild(noteElement);

            // Trigger the show animation
            requestAnimationFrame(() => {
                noteElement.classList.add('show');
            });

            inputField.value = '';
        }
    }

    addNoteBtn.addEventListener('click', addNote);

    inputField.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addNote();
        }
    });

    function renderNotes() {
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = createNoteElement(note, index);
            notesContainer.appendChild(noteElement);

            // Trigger the show animation
            requestAnimationFrame(() => {
                noteElement.classList.add('show');
            });
        });
    }

    function createNoteElement(note, index) {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.style.width = note.width;
        noteElement.style.height = note.height;

        const noteText = document.createElement('p');
        noteText.textContent = note.text;

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', function () {
            editNote(index);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function () {
            deleteNote(noteElement, index);
        });

        noteElement.appendChild(noteText);
        noteElement.appendChild(editBtn);
        noteElement.appendChild(deleteBtn);

        return noteElement;
    }

    function deleteNote(noteElement, index) {
        // Add the hide animation class
        noteElement.classList.add('hide');

        // Listen for the end of the animation before removing the element
        noteElement.addEventListener('transitionend', function () {
            // Remove the note from the array and update localStorage
            notes.splice(index, 1);
            saveNotesToLocalStorage();

            // Re-render notes to update indices
            renderNotes();
        }, { once: true });
    }

    function editNote(index) {
        const newText = prompt("Edit your note:", notes[index].text);
        if (newText !== null && newText.trim() !== '') {
            notes[index].text = newText.trim();
            saveNotesToLocalStorage(); // Save to localStorage after editing

            // Update the specific note's text in the DOM
            const noteElements = document.querySelectorAll('.note');
            if (noteElements[index]) {
                const noteText = noteElements[index].querySelector('p');
                noteText.textContent = newText.trim();
            }
        }
    }

    // Save the current notes to localStorage
    function saveNotesToLocalStorage() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Load the notes from localStorage when the page loads
    function loadNotesFromLocalStorage() {
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : [];
    }

    // Initial render of notes
    renderNotes();
});
