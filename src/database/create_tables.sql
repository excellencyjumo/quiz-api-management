-- Active: 1689181496037@@127.0.0.1@5432@Quiz
--Overall score_card COLUMN INT 
--{This Column will get updated once user answers another quiz} 
--{Dependent on the QuizCount Column}
--QuizCount COLUMN INT 
--{This Column saves the number of quiz user answers}
CREATE TABLE Users (
  user_id INTEGER PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL
);

--updated_at WORKS ON TRIGGER FUNCTION
--duration column TIMESTAMP
CREATE TABLE Quizzes (
  quiz_id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_by INTEGER REFERENCES Users(user_id),
  created_date TIMESTAMP DEFAULT NOW(),
  quiz_status BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP
);

-- Create Questions table
-- UPDATED_AT COLUMN WORKS ON TRIGGER FUNCTION 
CREATE TABLE IF NOT EXISTS Questions (
  question_id INTEGER PRIMARY KEY,
  question VARCHAR(255) NOT NULL,
  options VARCHAR(255)[] NOT NULL,
  answer INTEGER NOT NULL,
  quiz_id INTEGER REFERENCES Quizzes(quiz_id) ON DELETE CASCADE,
  marks INTEGER NOT NULL,
  updated_at TIMESTAMP
);


CREATE TABLE Participants (
  participant_id INTEGER REFERENCES Users(user_id),
  quiz_id INTEGER REFERENCES Quizzes(quiz_id),
  participation_date TIMESTAMP DEFAULT NOW(),
  score INTEGER NOT NULL
);
