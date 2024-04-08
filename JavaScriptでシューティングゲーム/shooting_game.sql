CREATE DATABASE rankings;

USE rankings;

CREATE TABLE rankings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(255),
    highest_score INT,
    previous_score INT
);

INSERT INTO rankings (player_name, highest_score, previous_score)
VALUES
    ('Player 1', 100, 80),
    ('Player 2', 90, 70),
    ('Player 3', 80, 60);


SELECT player_name, highest_score, previous_score
FROM rankings
ORDER BY highest_score DESC;
