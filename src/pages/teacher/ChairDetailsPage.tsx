import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { chairService } from "../../services/chair.service";
import { ChairType } from "../../types/chair.types";

const ChairDetailsPage = () => {
  const { chairId } = useParams();
  const [chair, setChair] = useState<ChairType | null>(null);

  useEffect(() => {
    if (!chairId) return;
    chairService.getById(parseInt(chairId))
      .then(setChair)
      .catch(console.error);
  }, [chairId]);

  if (!chair) return <p>Loading chair...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Chair {chair.id}</h2>
      <p><strong>Serial number:</strong> {chair.serialNumberByClass}</p>
      <p><strong>Near Door:</strong> {chair.isNearTheDoor ? "Yes" : "No"}</p>
      <p><strong>Near Window:</strong> {chair.isNearTheWindow ? "Yes" : "No"}</p>
      {/* פעולות ניהול עתידיות */}
    </div>
  );
};

export default ChairDetailsPage;
