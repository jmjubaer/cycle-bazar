type ProductCardProps = {
    description: string;
};
const DescriptionTab = ({ description }: ProductCardProps) => {
    return <p className="text-lg">{description}</p>;
};

export default DescriptionTab;
