CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL
);

CREATE TABLE Quizzes (
  quiz_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_by INTEGER REFERENCES Users(user_id),
  created_date TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE Questions (
  question_id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  quiz_id INTEGER REFERENCES Quizzes(quiz_id) ON DELETE CASCADE,
  marks INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);


CREATE TABLE Participants (
  participation_id SERIAL PRIMARY KEY,
  participant_id INTEGER REFERENCES Users(user_id),
  quiz_id INTEGER REFERENCES Quizzes(quiz_id),
  participation_date TIMESTAMP DEFAULT NOW(),
  score INTEGER
);
