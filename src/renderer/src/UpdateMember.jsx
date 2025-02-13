import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateMember() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const familyMember = state?.member || {};

  const submitHandler = async (e) => {
    e.preventDefault();
    
    navigate("/");
  };

  return (
    <div className="form">
      <button onClick={() => navigate("/")}>{"<-- Назад"}</button>
      <h1>Обновить данные члена семьи</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="full_name">ФИО:</label>
        <input id="full_name" type="text" required defaultValue={familyMember.fullname} />
        <label htmlFor="age">Дата рождения:</label>
        <input id="age" type="date" required defaultValue={familyMember.age} />
        <label htmlFor="current_position">Текущая должность:</label>
        <input id="current_position" type="text" defaultValue={familyMember.currentposition} />
        <label htmlFor="workplace">Текущее место работы:</label>
        <input id="workplace" type="text" defaultValue={familyMember.workplace} />
        <label htmlFor="total_income">Текущий месячный доход:</label>
        <input id="total_income" type="number" min="0" required defaultValue={familyMember.totalincome} />
        <button type="submit">Обновить данные</button>
      </form>
    </div>
  );
}

export default UpdateMember;