type ProductCardProps = {
    description: string;
};
const DescriptionTab = ({ description }: ProductCardProps) => {
    return <p className="xs:text-lg text-base">{description}</p>;
};

export default DescriptionTab;
