import Link from 'next/link';

const HomePage = () => {
    return (
        <>
            <div className="class-2xl">Home Page!</div>
            <Link href={{ pathname: "properties"}}>Properties</Link>
        </>
    );
};

export default HomePage;