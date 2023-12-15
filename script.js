let notes = [
    {
        id: 0,
        title: 'task1',
        text: 'this is text task1'
    },
    {
        id: 1,
        title: 'task2',
        text: 'task2 text test  '
    }
]

function createNoteButton(title, id) {
    const note = document.createElement('button');
    note.className = 'note';
    note.innerHTML = `${title}`;
    note.setAttribute('data-taskid',    id);
    return note;
}

const noteList = document.querySelector('.left-list');
const textarea = document.querySelector('#area');
const saveBtn = document.querySelector('.save');
const addBtn = document.querySelector('.left__add');
let openedTaskId = -1;
let idCounter = 2;

notes.forEach(el => {
    noteList.appendChild(createNoteButton(el.title, el.id));
})

noteList.addEventListener('click', e => {
    if (e.target.className == 'note') {
        let taskId = e.target.dataset.taskid;
        openedTaskId = taskId;
        let clickedTask = notes.find(el => el.id == taskId);
        textarea.value = clickedTask.text;
    }
})

saveBtn.addEventListener('click', e => {
    if (openedTaskId != -1) {
        notes.find(el => el.id == openedTaskId).text = textarea.value;
    } else {
        const currentTitle = textarea.value.split(' ')[0];
        const newNote = {
            id: idCounter,
            title: currentTitle,
            text: textarea.value
        }
        idCounter++;

        notes.push(newNote);
        noteList.innerHTML = '';
        notes.forEach(el => {
            noteList.appendChild(createNoteButton(el.title, el.id));
        })
    }
})

addBtn.addEventListener('click', () => {
    openedTaskId = -1;
    textarea.value = '';
})