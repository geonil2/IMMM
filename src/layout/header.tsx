import Logo from '../components/common/logo';
import Nav from '../components/header/nav';
import Sign from '../components/header/sign';

const Header = () => {
    return (
        <header>
            <div className="header-logo">
                <Logo />
            </div>

            <Nav />

            <Sign />
        </header>
    );
};

export default Header;