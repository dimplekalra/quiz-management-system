# PLAN.md

## Assumptions

- Simple admin login using hardcoded credentials.
- Admin can create quizzes with MCQ, True/False, Text questions.
- Public users can list quizzes, take quizzes and see results.
- No deployment required but optional.
- Focus on API correctness + clean UI

## Data Model (Mongoose)

Quiz {
title : String,
questions : [{
type : "mcq" | "truefalse" | "text",
question : String,
options : [String], // MCQ only
correctAnswer : String // text or index for MCQ
}]
}

Submission {
quizId,
answers : [{questionIndex, answer}],
score : number
}

## API Endpoints

POST /auth/login
POST /quizzes
GET /quizzes
GET /quizzes/:id
POST /quizzes/:id/submit

## Implementation Order

1. Project scaffold + PLAN.md
2. Backend setup + DB + models
3. API routes + admin login
4. Frontend setup + admin create quiz
5. Public quiz player + submit
6. Tests + polish

## Tradeoffs

- No roles/JWT to save time.
- Basic error handling only
