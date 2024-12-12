import Navbar from 'app/ui/navbar/navbar';

type props = {
	children: React.ReactNode;
};
export default function Page({ children }: props) {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
