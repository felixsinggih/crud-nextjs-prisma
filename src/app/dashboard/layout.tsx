export const metadata = {
    title: 'Dashboard'
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="mt-4 mx-3">{children}</div>
}

export default DashboardLayout