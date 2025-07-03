import { v4 as uuid } from 'uuid';

export const notesReducer = (state, { type, payload }) => {
    switch (type) {
        case 'TITLE':
            return {
                ...state,
                title: payload
            }
        case 'TEXT':
            return {
                ...state,
                text: payload
            }
        case 'ADD_NOTE':
            return {
                ...state,
                notes: [...state.notes, { text: state.text, title: state.title, id: uuid(), isPinned: false }]
            }
        case 'CLEAR_INPUT':
            return {
                ...state,
                title: '',
                text: ''
            }
        case 'PIN':
            return {
                ...state,
                notes: state.notes.map(note => note.id === payload.id ? { ...note, isPinned: !note.isPinned } : note)
            }
        case 'UNPIN':
            return {
                ...state,
                notes: state.notes.map(note => note.id === payload.id ? { ...note, isPinned: !note.isPinned } : note)
            }
        case 'ARCHIVE':
            return {
                ...state,
                archive: [...state.archive, state.notes.find(({ id }) => id === payload.id)],
                notes: state.notes.filter(({ id }) => id !== payload.id)
            }
        case 'UNARCHIVE':
            return {
                ...state,
                notes: [...state.notes, state.archive.find(({ id }) => id === payload.id)],
                archive: state.archive.filter(({ id }) => id !== payload.id)
            }
        case 'MARK_AS_IMPORTANT':
            return {
                ...state,
                important: [...state.important, state.notes.find(({ id }) => id === payload.id)],
                notes: state.notes.filter(({ id }) => id !== payload.id)
            }
        case 'UNMARK_AS_IMPORTANT':
            return {
                ...state,
                notes: [...state.notes, state.important.find(({ id }) => id === payload.id)],
                important: state.important.filter(({ id }) => id !== payload.id)
            }
        case 'ADD_TO_BIN':
            const fromNotes = state.notes.find(({ id }) => id === payload.id);
            const fromArchive = state.archive.find(({ id }) => id === payload.id);
            const fromImportant = state.important.find(({ id }) => id === payload.id);

            const noteToBin = fromNotes || fromArchive || fromImportant;

            return {
                ...state,
                bin: [...state.bin, noteToBin],
                notes: state.notes.filter(({ id }) => id !== payload.id),
                archive: state.archive.filter(({ id }) => id !== payload.id),
                important: state.important.filter(({ id }) => id !== payload.id)
            };
        case 'REMOVE_FROM_BIN':
            return {
                ...state,
                bin: state.bin.filter(({ id }) => id !== payload.id)
            }
        default:
            return state;
    }
}