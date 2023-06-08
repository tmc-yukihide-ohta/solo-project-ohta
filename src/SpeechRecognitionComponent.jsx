import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const SpeechRecognitionComponent = () => {
  const { transcript, listening, startListening, stopListening } =
    useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>このブラウザは音声入力をサポートしていません。</div>;
  }

  return (
    <div>
      <div>{transcript}</div>
      <button onClick={startListening} disabled={listening}>
        音声入力を開始
      </button>
      <button onClick={stopListening} disabled={!listening}>
        音声入力を停止
      </button>
    </div>
  );
};
