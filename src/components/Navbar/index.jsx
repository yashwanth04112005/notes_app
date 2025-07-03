import logo from '../../assets/logo.png'

export const Navbar=()=>{
    return(
        <header className='flex px-5 py-1 gap-3 border-b-2 border-gray-100'>
            <div className='w-12 h-12'>
                <img className='w-full h--full' src={logo} alt="logo" />
            </div>
            <h1 className='text-blue-600 text-4xl font-bold' >NoteNest</h1>
        </header>
    )
}