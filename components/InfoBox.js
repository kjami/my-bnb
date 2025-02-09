const Infobox = ({ title, children, backgroudColor = "bg-gray-100", textColor="text-gray", buttonInfo }) => {
    return (
        <div className={`${backgroudColor} p-6 rounded-lg shadow-md`}>
            <h2 className={`${textColor} text-2xl font-bold`}>{title}</h2>
            <p className={`${textColor} mt-2 mb-4`}>
                {children}
            </p>
            <a
            href={buttonInfo.link}
            className={`${buttonInfo.backgroudColor} inline-block text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
            >
                {buttonInfo.text}
            </a>
        </div>
    );
};

export default Infobox;