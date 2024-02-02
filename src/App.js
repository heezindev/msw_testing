import { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";

function App() {
  const [studyUsers, setStudyUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(studyUsers);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeAge = (e) => {
    setAge(e.target.value);
  };

  const handleChangeId = (e) => {
    setId(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/studyUsers");
        setStudyUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("/studyUsers", {
        name,
        age,
      });

      const response = await axios.get("/studyUsers");
      setName("");
      setAge("");
      setStudyUsers(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSubmit = async (e, id) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.put(`/studyUsers/${id}`, {
        name,
        age,
      });

      const response = await axios.get("/studyUsers");
      setId("");
      setName("");
      setAge("");
      setStudyUsers(response.data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        alert("해당하는 아이디를 찾을 수 없습니다.");
        setId("");
        setName("");
        setAge("");
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setIsSubmitting(true);

    await axios.delete(`/studyUsers/${id}`);

    setStudyUsers((prev) => prev.filter((v) => v.id !== id));
    setIsSubmitting(false);
  };

  return (
    <AppStyle>
      {studyUsers.length > 0 ? (
        studyUsers.map((studyUser) => (
          <div className="users" key={studyUser.id}>
            <p>ID: {studyUser.id}</p>
            <p>이름: {studyUser.name}</p>
            <p>나이: {studyUser.age}</p>
            <button onClick={() => handleDelete(studyUser.id)}>삭제</button>
          </div>
        ))
      ) : (
        <p>... 로딩중</p>
      )}
      <div className="form">
        <form
          onSubmit={id ? (e) => handleUpdateSubmit(e, id) : handleCreateSubmit}
          className="create"
        >
          <input
            placeholder="아이디"
            onChange={handleChangeId}
            value={id}
            type="number"
            disabled={isSubmitting}
          />
          <input
            placeholder="이름"
            onChange={handleChangeName}
            value={name}
            type="text"
            disabled={isSubmitting}
          />
          <input
            placeholder="나이"
            onChange={handleChangeAge}
            value={age}
            type="number"
            disabled={isSubmitting}
          />
          <button>{id ? "수정" : "추가"}</button>
        </form>
      </div>
    </AppStyle>
  );
}

export default App;

const AppStyle = styled.div`
  & > .users {
    display: flex;
    align-items: center;

    & > p {
      margin-right: 10px;
    }

    & > button {
      width: 100px;
      height: 30px;
    }
  }

  & > .form {
    display: flex;
    & > .create {
      padding: 10px;
      display: flex;
      flex-direction: column;
      width: 300px;

      & > input {
        width: 100px;
        height: 30px;
        margin-bottom: 10px;
      }

      & > button {
        width: 100px;
        height: 30px;
      }
    }
    & > .update {
      padding: 10px;
      display: flex;
      flex-direction: column;
      width: 300px;

      & > input {
        width: 100px;
        height: 30px;
        margin-bottom: 10px;
      }

      & > button {
        width: 100px;
        height: 30px;
      }
    }
  }
`;
