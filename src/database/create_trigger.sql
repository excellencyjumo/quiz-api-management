-- Active: 1683826145931@@localhost@27017
CREATE OR REPLACE FUNCTION update_quiz_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_quiz_updated_at_trigger
BEFORE UPDATE ON Quizzes
FOR EACH ROW
EXECUTE FUNCTION update_quiz_updated_at();