import Sidebar from './_components/Sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className='grid grid-cols-1 md:grid-cols-6 min-h-screen '>
            <Sidebar />
            <div className='md:col-span-5 col-span-1'>
                {children}
            </div>
        </main>
    )
}
