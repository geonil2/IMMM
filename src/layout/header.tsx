import Logo from '../components/common/logo';
import Nav from '../components/header/nav';
import Sign from '../components/header/sign';

const Header = () => {
    return (
        <header>
            <div className="header-logo">
                <Logo />
            </div>

            <div className="header-right">
                <Nav />
                <Sign />
            </div>
        </header>
    );
};

export default Header;