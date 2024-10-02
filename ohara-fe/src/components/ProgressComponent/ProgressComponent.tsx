import { LinearProgress, LinearProgressProps } from "@mui/material";

function ProgressBarComponent(props: LinearProgressProps & { value: number }) {
  return (
    <div className="w-full flex flex-col items-end">
      <div>
        <p className="text-sm font-bold">{`${Math.round(props.value)}%`}</p>
      </div>
      <div className="w-full rounded-full">
        <LinearProgress variant="determinate" {...props} />
      </div>
    </div>
  );
}

export default ProgressBarComponent;
