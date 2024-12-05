import { CHANGED } from "../constants";

export const konzek = (konzek: any = null, action: any) => {
  switch (action.type) {
    case CHANGED:
      konzek = {
        ...konzek,
        state: action.state,
      };
      return konzek;
  }

  return konzek;
};
