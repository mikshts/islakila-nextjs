import { memo, useState } from "react";
import { DEFAULT_IMAGE } from "../constants/index.js";

export const SafeImage = memo(({ src, alt, className, style }) => {
  const [err, setErr] = useState(false);
  return (
    <img
      src={err || !src ? DEFAULT_IMAGE : src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setErr(true)}
      loading="lazy"
      decoding="async"
    />
  );
});
