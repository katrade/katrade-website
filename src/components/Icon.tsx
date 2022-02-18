interface iconInterface {
  src: string;
  width?: string;
  height?: string;
  onClick?: any;
  style?: any;
  className?: string;
}
const iconStyle = {
  marginLeft: "14px",
  marginRight: "14px",
  marginTop: "4px",
  marginBottom: "4px",
};

export default function Icon({
  src,
  width,
  height,
  onClick,
  style,
  className,
}: iconInterface) {
  return (
    <img
      src={src}
      width={width}
      height={height}
      style={{ ...iconStyle, ...style }}
      className={"pointer " + className}
      onClick={onClick}
    />
  );
}
