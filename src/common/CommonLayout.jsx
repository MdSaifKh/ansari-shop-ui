import Footer from "./Footer";
import Header from "./Header";

const CommonLayout = ({ children }) => (
    <>
    <Header />
    <main style={{minHeight: "80vh", padding: "2rem"}}>{children}</main>
    <Footer />
    </>
)

export default CommonLayout;