import Head from "next/head"
import Header from "./Header"

const Layout = ({children}) => {
  return (
    <>
        <Head>
            <title>React-NodeSend</title>
        </Head>

        <div className=" bg-gray-100 min-h-screen pb-32">
            <div className=" container mx-auto">
                <Header />
                <main className=" mt-10">
                    {children}
                </main>
            </div>
        </div>
    </>
  )
}

export default Layout

