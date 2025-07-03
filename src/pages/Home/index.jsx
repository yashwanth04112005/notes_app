import { Navbar } from "../../components/Navbar";
import { Fragment } from "react";
import { Sidebar } from "../../components/Sidebar";
import { NotesCard } from "../../components/NotesCard";
import { useNotes } from "../../context/notes-context";

export const Home = () => {

    const { title, text, notes, archive, important, bin, notesDispatch } = useNotes();

    const onTitleChange = (e) => {
        notesDispatch({
            type: 'TITLE',
            payload: e.target.value
        })
    }

    const onTextChange = (e) => {
        notesDispatch({
            type: 'TEXT',
            payload: e.target.value
        })
    }

    const onAddClick = () => {
        notesDispatch({
            type: 'ADD_NOTE'
        })
        notesDispatch({
            type: 'CLEAR_INPUT'
        })
    }

    const pinnedNotes = notes?.length > 0 && notes.filter(({ isPinned }) => isPinned);
    const otherNotes = notes?.length > 0 && notes.filter(({ isPinned }) => !isPinned);

    return (
        <Fragment>
            <Navbar />
            <main className="flex gap-3">
                <Sidebar />
                <div className="flex flex-col w-screen mt-7">
                    <div className="flex flex-col w-[450px] relative border rounded-md self-center">
                        <input value={title} onChange={onTitleChange} type="text" className=" border rounded-t-md border-b-0" placeholder="Enter title" />
                        <textarea value={text} onChange={onTextChange} className="h-[100px] border rounded-b-md" placeholder="Enter text" />
                        <button title="Add Note" disabled={title.length == 0} onClick={onAddClick} className="w-7 h-7 absolute bottom-0 right-0 rounded-full">
                            <span className="material-icons">
                                add
                            </span>
                        </button>
                    </div>
                    <div className="mt-14 ml-10 flex flex-col gap-5">
                        {
                            pinnedNotes?.length > 0 && (
                                <div>
                                    <h3 className="">Pinned Notes</h3>
                                    <div className="flex flex-wrap gap-4" >
                                        {
                                            pinnedNotes?.length > 0 && pinnedNotes.map(({ id, title, text, isPinned }) => (
                                                <NotesCard key={id} id={id} title={title} text={text} isPinned={isPinned} />
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }
                        <div>
                            {
                                pinnedNotes?.length > 0 && <h3 className="">Other Notes</h3>
                            }
                            <div className=" flex flex-wrap gap-4" >

                                {
                                    otherNotes?.length > 0 && otherNotes.map(({ id, title, text, isPinned }) => (
                                        <NotesCard key={id} id={id} title={title} text={text} isPinned={isPinned} />
                                    ))
                                }
                            </div>
                        </div>


                    </div>

                </div>
            </main>
        </Fragment>
    )
}