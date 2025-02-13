import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function App() {
  const navigate = useNavigate();
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await window.api.getFamilyMembers();
      setFamilyMembers(res);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="page-heading">
        <img className="page-logo" src={electronLogo} alt="Electron Logo" />
        <h1>Члены Семьи</h1>
      </div>
      <div className="family-members-list">
        {familyMembers.map((member, index) => (
          <div
            key={index}
            className="family-member-card"
            onClick={() => navigate("/update", { state: { member } })}
          >
            <div className="member-info">
              <p><strong>ФИО:</strong> {member.fullname}</p>
              <p><strong>Возраст:</strong> {member.age}</p>
              <p><strong>Должность:</strong> {member.currentposition}</p>
              <p><strong>Место работы:</strong> {member.workplace}</p>
              <p><strong>Общий доход:</strong> {member.totalincome}</p>
            </div>
            <div className="budget-status">
              <p><strong>Состояние трат к доходам:</strong> {member.budgetstatus}</p>
            </div>
          </div>
        ))}
        <button onClick={() => navigate("/create")}>Создать партнера</button>
      </div>
    </>
  );
}

export default App;