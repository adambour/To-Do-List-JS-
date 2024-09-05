document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.querySelector('input[type="text"]');
    const addNoteBtn = document.querySelector('.btn1');
    let notes = [];

    function addNote() {
        const inputValue = inputField.value.trim();
        if (inputValue !== '') {
            const note = {
                text: inputValue,
                width: "100%",
                height: "50%",
            };
            notes.push(note);
            renderNotes();
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
        const notesContainer = document.querySelector('.notes-container');
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
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
                deleteNote(index);
            });


            noteElement.appendChild(noteText);
            noteElement.appendChild(editBtn);
            noteElement.appendChild(deleteBtn);


            notesContainer.appendChild(noteElement);
        });
    }


    function deleteNote(index) {
        notes.splice(index, 1);
        renderNotes();
    }


    function editNote(index) {
        const newText = prompt("Edit your note:", notes[index].text);
        if (newText !== null && newText.trim() !== '') {
            notes[index].text = newText.trim();
            renderNotes();
        }
    }
});
