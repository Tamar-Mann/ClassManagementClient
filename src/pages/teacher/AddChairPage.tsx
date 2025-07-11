import { useParams } from "react-router-dom";
import AddChairForm from "../../components/AddChairForm";

const AddChairPage = () => {
  const { classId } = useParams();
  console.log("classId from params:", classId);

  if (!classId || isNaN(Number(classId))) return <p>Class ID is missing</p>;

  return (
    <div className="add-chair-page">
      <h1>Add Chair to Class {classId}</h1>
      <AddChairForm classId={Number(classId)} />
    </div>
  );
};

export default AddChairPage;