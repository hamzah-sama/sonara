import { TextToSpeechView } from "@/modules/text-to-speech/view/text-to-speech-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to speech",
};

const Page = async () => {
  return <TextToSpeechView />;
};

export default Page;
