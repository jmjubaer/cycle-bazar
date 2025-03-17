type TProps = {
    title: string;
    description: string;
    textCenter?: boolean;
};
const SectionTitle = ({ title, description, textCenter }: TProps) => {
    // split title 
    const [before, after] = description.split(",");

    return (
        <div className={`${textCenter && "text-center"}`}>
            <h3
                data-aos='fade-right'
                className='md:text-xl text-sm xs:text-base sm:text-lg font-bold xs:font-medium text-muted'>
                {title}
            </h3>
            <h2
                data-aos='fade-right'
                data-aos-delay='200'
                className=' md:text-4xl  xs:text-2xl mt-1 xs:mt-3  font-semibold secondary_font'>
                {before} <br />
                {after}
            </h2>
        </div>
    );
};

export default SectionTitle;
