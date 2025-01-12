import LoadingBar from "react-top-loading-bar";

export default function Loader({
  setProgress,
  progress,
}: {
  progress: number;
  setProgress: (e: number) => void;
}) {
  return (
    <LoadingBar
      color="#202450"
      progress={progress}
      height={6}
      onLoaderFinished={() => setProgress(0)}
    />
  );
}
