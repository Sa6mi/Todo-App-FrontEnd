import { LucideProps } from "lucide-react";
import "./Routes/scss/Button.css";
interface Props extends React.PropsWithChildren {
  Text: string;
  BGcolor: string;
  TextColor: string;
  onClick?: () => void;
}
function Button(Props: Props) {
  return (
    <button
      onClick={() => Props.onClick?.()}
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
