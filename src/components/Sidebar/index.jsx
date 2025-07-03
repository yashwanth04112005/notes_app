import { NavLink } from 'react-router-dom';

export const Sidebar = () => {

    const getStyles = ({isActive}) => {
        const styles='flex align-center gap-1 px-2 py-1 rounded-tl-full rounded-bl-full'
        return isActive ? `bg-blue-600 text-slate-50 ${styles}` : `hover:bg-blue-600 hover:text-slate-50 ${styles}`
    }

    return (
        <aside className='flex flex-col gap-3 border-r-2 border-gray-100 w-[150px] h-screen p-3 '>
            <NavLink className={getStyles} to='/'>
                <span class="material-icons">
                    home
                </span>
                <span>Home</span>
            </NavLink>
            <NavLink className={getStyles} to='/archive'>
                <span class="material-icons">
                    archive
                </span>
                <span>Archive</span>
            </NavLink>
            <NavLink className={getStyles} to='/important'>
                <span class="material-icons">
                    label_important
                </span>
                <span>Important</span>
            </NavLink>
            <NavLink className={getStyles} to='/bin'>
                <span class="material-icons">
                    delete
                </span>
                <span>Bin</span>
            </NavLink>
        </aside>
    )
}