import React, { useEffect, useState } from "react";
import { chairService } from "../../services/chair.service";
import { ChairType } from "../../types/chair.types";
import ChairRow from "./ChairRow";
import "../css/ChairTable.css";

type Props = { classId: number };

const ChairTable: React.FC<Props> = ({ classId }) => {
  const [chairs, setChairs] = useState<ChairType[]>([]);

  useEffect(() => {
    chairService.getChairsByClass(classId)
      .then(setChairs)
      .catch(console.error);
  }, [classId]);

  return (
    <table className="chair-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Serial number</th>
          <th>Near Door</th>
          <th>Near Window</th>
          {/* <th>Action</th> */}
        </tr>
      </thead>
      <tbody>
        {chairs.map((chair) => <ChairRow key={chair.id} chair={chair} />)}
      </tbody>
    </table>
  );
};

export default ChairTable;
