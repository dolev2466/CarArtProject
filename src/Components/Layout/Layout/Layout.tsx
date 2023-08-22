import Header from "./Header/Header";
import Menu from "../Menu/Menu";
import "./Layout.css";
import Routing from "../../Routing/Routing/Routing";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
			 <header><Header /></header>
            <aside><Menu/></aside>
            <main><Routing/></main>
        </div>
    );
}

export default Layout;
