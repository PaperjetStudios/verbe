export default function cs(...args: any[]): string {
  const res = args.map((arg) => {
    if (typeof arg === "string") {
      return arg;
    } else if (typeof arg === "object") {
      const entry = Object.entries(arg);

      if (entry[0][1]) {
        return entry[0][0];
      } else {
        return "";
      }
    }
  });

  return res.join(" ");
}
