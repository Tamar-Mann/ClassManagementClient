import React from "react";
import { ChairType } from "../../types/chair.types";
import { Link } from "react-router-dom";

const ChairRow: React.FC<{ chair: ChairType }> = ({ chair }) => {
  return (
    <tr className="chair-row">
      <td>{chair.id}</td>
      <td>{chair.serialNumberByClass}</td>
      <td>{chair.isNearTheDoor ? "Yes" : "No"}</td>
      <td>{chair.isNearTheWindow ? "Yes" : "No"}</td>
      {/* <td className="chair-actions">
        <Link to={`/chair/${chair.id}`}>Manage Chair</Link>
      </td> */}
    </tr>
  );
};

export default ChairRow;
