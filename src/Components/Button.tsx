import { LucideProps } from "lucide-react";
import "./Routes/scss/Button.css";
interface Props extends React.PropsWithChildren {
  Text: string;
  BGcolor: string;
  TextColor: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}
function Button(Props: Props) {
  return (
    <button
      disabled={Props.disabled}
      onClick={(e) => Props.onClick?.(e)}
      style={{
        backgroundColor: `${Props.BGcolor}`,
        color: `${Props.TextColor}`,
      }}
    >
      {Props.Text}
      {Props.children}
    </button>
  );
}

export default Button;
