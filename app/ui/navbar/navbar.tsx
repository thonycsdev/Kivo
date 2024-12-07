import Link from 'next/link';
import styles from './navbar.module.scss';
export function Navbar() {
	type NavbarItem = {
		label: string;
		href: string;
	};
	const navbarItems: NavbarItem[] = [
		{ label: 'Início', href: '/' },
		{ label: 'Clientes', href: './clientes' },
		{ label: 'Vendas', href: './vendas' },
		{ label: 'Redes', href: './redes' },
		{ label: 'Emails', href: './emails' }
	];
	return (
		<nav className={styles.navbar}>
			<p className={styles.title}>Praja Construtora</p>
			<div className={styles.bar} />
			<div className={styles.navItens}>
				{navbarItems.map((item) => (
					<Link
						style={{ textDecoration: 'none', color: 'white' }}
						href={`/${item.href}`}
						key={item.label}
						className={styles.navItem}
					>
						{item.label}
					</Link>
				))}
			</div>
		</nav>
	);
}
