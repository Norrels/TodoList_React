import style from './Header.module.css';
import Logo from '../assets/Logo.svg'

export function Header() {
    return (
        <header className={style.header}>
            <img src={Logo} alt="Title: Letras com degrade de roxo superior e rosa inferior e com uma fonte handwritten (estilo feita a mão)" />
        </header>
    )
}