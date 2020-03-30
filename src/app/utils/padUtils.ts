export const padLeftWithString = (source, padString: string, padLength: number) => {
  return (padString.repeat(padLength) + source).slice(-padLength);
};
