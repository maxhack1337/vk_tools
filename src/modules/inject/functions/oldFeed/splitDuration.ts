              const splitDuration = (dura: number) => {
                let hours = Math.floor(dura / 3600);
                let minutes = Math.floor((dura % 3600) / 60);
                let seconds = dura % 60;

                if (hours === 0) {
                  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
                } else {
                  return `${hours}:${minutes
                    .toString()
                    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
                }
}
              
export default splitDuration;