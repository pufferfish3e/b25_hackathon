import Link from 'next/link';


export default function Navbar() {
    return (
        <nav className="relative w-screen bg-gray flex h-16 items-center bg-gray-100">
            <ul className="absolute top-0 right-0 flex flex-row h-full gap-8 p-4 mt-4 mx-6 text-xl font-bold">
                <li className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    <Link href="/">Home</Link>
                </li>
                <li className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    <Link href="/about">About</Link>
                </li>
                <li className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    <Link href="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    );
}

//  bg-gray-300 bg-opacity-20 rounded-s-md backdrop-blur-lg rounded drop-shadow-lg"