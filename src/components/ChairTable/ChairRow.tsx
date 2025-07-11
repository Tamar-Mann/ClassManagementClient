import React from "react";
import { ChairType } from "../../types/chair.types";

type Props = { chair: ChairType };

const ChairRow: React.FC<Props> = ({ chair }) => {
  return (
    <tr>
      <td>{chair.id}</td>
      <td>{chair.serialNumberByClass}</td>
      <td>{chair.isNearTheDoor ? "🚪" : "—"}</td>
      <td>{chair.isNearTheWindow ? "🪟" : "—"}</td>
    </tr>
  );
};

export default ChairRow;
