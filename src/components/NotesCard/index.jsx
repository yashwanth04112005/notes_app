import { useNotes } from "../../context/notes-context"
import { findNotesInArchive } from "../../utils/findNotesInArchive";
import { findNotesInImportant } from "../../utils/findNotesInImportant";
import { findNotesInBin } from "../../utils/findNotesInBin";

export const NotesCard = ({ id, title, text, isPinned }) => {

    const { notesDispatch, archive, important, bin } = useNotes();

    const isNotesInArchive = findNotesInArchive(archive, id);
    const isNotesInImportant = findNotesInImportant(important, id);
    const isNotesInBin = findNotesInBin(bin, id);

    const onPinClick = (id) => {
        !isPinned ? notesDispatch({
            type: 'PIN',
            payload: { id }
        }) : notesDispatch({
            type: 'UNPIN',
            payload: { id }
        })
    }

    const onArchiveClick = (id) => {
        !isNotesInArchive ? notesDispatch({
            type: 'ARCHIVE',
            payload: { id }
        }) : notesDispatch({
            type: 'UNARCHIVE',
            payload: { id }
        })
    }

    const onImportantClick = (id) => {
        !isNotesInImportant ? notesDispatch({
            type: 'MARK_AS_IMPORTANT',
            payload: { id }
        }) : notesDispatch({
            type: 'UNMARK_AS_IMPORTANT',
            payload: { id }
        })
    }

    const onBinClick = (id) => {
        !isNotesInBin ? notesDispatch({
            type: 'ADD_TO_BIN',
            payload: { id }
        }) : notesDispatch({
            type: 'REMOVE_FROM_BIN',
            payload: { id }
        })
    }

    return (
        <div className="w-56 border border-neutral-800 p-2 rounded-md w-[300px]" key={id}>
            <div className="flex justify-between border-b-1 ">
                <p>{title}</p>
                {
                    !isNotesInArchive && !isNotesInImportant && !isNotesInBin ? <button onClick={() => onPinClick(id)}>
                        <span className={isPinned ? 'material-icons' : 'material-icons-outlined'}>
                            push_pin
                        </span>
                    </button> : <></>
                }
            </div>
            <div className="flex flex-col">
                <p>{text}</p>
                <div className="ml-auto">
                    {!isNotesInImportant && !isNotesInBin ? <button onClick={() => onArchiveClick(id)}>
                        <span className={isNotesInArchive ? "material-icons" : "material-icons-outlined"}>
                            archive
                        </span>
                    </button> : <></>}
                    {!isNotesInArchive && !isNotesInBin ? <button onClick={() => onImportantClick(id)}>
                        <span className={isNotesInImportant ? "material-icons " : "material-icons-outlined"}>
                            bookmarks
                        </span>
                    </button> : <></>}
                    <button onClick={() => onBinClick(id)}>
                        <span className="material-icons-outlined">
                            delete
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}