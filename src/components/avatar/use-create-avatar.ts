import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { glass } from "@dicebear/collection";

export const useCreateAvatar = (seed: string) => {
  return useMemo(() => {
    return createAvatar(glass, {
      seed,
      size: 100,
    }).toDataUri();
  }, [seed]);
};
