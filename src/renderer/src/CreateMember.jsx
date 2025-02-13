import React from "react";
import { useNavigate } from "react-router-dom";

function CreateMember() {
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
  
    navigate("/");
  };

  return (
    <div className="form">
      <button onClick={() => navigate("/")}>{"<-- Назад"}</button>
      <h1>Создать члена семьи</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="full_name">ФИО:</label>
        <input id="full_name" type="text" required />
        <label htmlFor="age">Дата рождения:</label>
        <input id="age" type="date" required />
        <label htmlFor="current_position">Текущая должность:</label>
        <input id="current_position" type="text" />
        <label htmlFor="workplace">Текущее место работы:</label>
        <input id="workplace" type="text" />
        <label htmlFor="total_income">Текущий месячный доход:</label>
        <input id="total_income" type="number" min="0" required />
        <button type="submit">Создать члена семьи</button>
      </form>
    </div>
  );
}

export default CreateMember;