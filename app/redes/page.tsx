'use client';
import { usePathname } from 'next/navigation';

export default function Page() {
	const pathName = usePathname();
	return <h1>{pathName}</h1>;
}
