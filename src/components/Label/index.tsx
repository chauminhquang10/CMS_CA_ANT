export type InformationDetail = {
  label: string;
};

const LabelCustom: React.FC<InformationDetail> = (props) => {
  const { label } = props;
  return <div className="label-custom">{label}</div>;
};

export default LabelCustom;
