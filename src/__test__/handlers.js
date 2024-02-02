import { http, HttpResponse } from "msw";

let studyUsers = [
  {
    id: 1,
    name: "장희진",
    age: 32,
  },
  {
    id: 2,
    name: "김지후",
    age: 30,
  },
  {
    id: 3,
    name: "김태완",
    age: 31,
  },
  {
    id: 4,
    name: "지현",
    age: 27,
  },
];

export const handlers = [
  http.get("/studyUsers", async () => {
    return HttpResponse.json(studyUsers, { status: 200 });
  }),
  http.post("/studyUsers", async ({ request }) => {
    const { name, age } = await request.json();

    const newStudyUser = { id: studyUsers.length + 1, name, age: +age };
    studyUsers.push(newStudyUser);

    return HttpResponse.json(newStudyUser, { status: 201 });
  }),

  http.put("/studyUsers/:id", async ({ request, params }) => {
    const { id } = params;
    const { name, age } = await request.json();

    const index = studyUsers.findIndex((user) => user.id === +id);

    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    studyUsers[index] = { id: +id, name, age: +age };

    return HttpResponse.json(studyUsers[index]);
  }),

  http.delete("/studyUsers/:id", async ({ params }) => {
    const { id } = params;

    const deletedPost = studyUsers.find((v) => v.id === +id);

    if (!deletedPost) {
      return new HttpResponse(null, { status: 404 });
    }

    studyUsers = studyUsers.filter((v) => v.id !== +id);

    return HttpResponse.json(deletedPost);
  }),
];
