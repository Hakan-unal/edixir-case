import { CHANGED } from "../constants";

export const edixir = (edixir: any = null, action: any) => {
  switch (action.type) {
    case CHANGED:
      edixir = {
        ...edixir,
        state: action.state,
      };
      return edixir;
  }

  return edixir;
};
