import Footer from '@/pages/common/footer.tsx'
import Header from '@/pages/common/header.tsx'
import SubHeader from '@/pages/common/sub-header.tsx'

export default function Index() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <SubHeader />
            <div className="flex flex-grow pt-20 px-40 gap-8">INDEX PAGE</div>
            <Footer />
        </div>
    )
}
