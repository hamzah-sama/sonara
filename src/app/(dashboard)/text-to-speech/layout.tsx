import { TextToSpeechLayout } from "@/modules/text-to-speech/view/text-to-speech-layout";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return <TextToSpeechLayout>{children}</TextToSpeechLayout>;
};

export default Layout;
