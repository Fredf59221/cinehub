CREATE DATABASE cinehub;
USE cinehub;

CREATE TABLE users (
    us_id INT PRIMARY KEY AUTO_INCREMENT,
    us_username VARCHAR(255) NOT NULL UNIQUE,
    us_password TEXT NOT NULL,
    us_email VARCHAR(255) NOT NULL UNIQUE, 
    us_role ENUM('user', 'admin') NOT NULL DEFAULT 'user'
);

CREATE TABLE films (
    fi_id INT PRIMARY KEY AUTO_INCREMENT,
    fi_title VARCHAR(255) NOT NULL,
    fi_description TEXT,
    fi_duration INT NOT NULL,
    fi_genre VARCHAR(100),
    fi_release_date DATE,
    fi_is_showing TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE rooms (
    ro_id INT PRIMARY KEY AUTO_INCREMENT,
    ro_name VARCHAR(100) NOT NULL UNIQUE,
    ro_capacity INT NOT NULL
);

CREATE TABLE screenings (
    sc_id INT PRIMARY KEY AUTO_INCREMENT,
    sc_film INT NOT NULL, 
    sc_room INT NOT NULL, 
    sc_datetime DATETIME NOT NULL,
    sc_price DECIMAL(6, 2) NOT NULL,
    FOREIGN KEY (sc_film) REFERENCES films(fi_id),
    FOREIGN KEY (sc_room) REFERENCES rooms(ro_id)
);

CREATE TABLE reservations (
    re_id INT PRIMARY KEY AUTO_INCREMENT,
    re_user INT NOT NULL, 
    re_screening INT NOT NULL, 
    re_seats INT NOT NULL DEFAULT 1,
    re_created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (re_user) REFERENCES users(us_id),
    FOREIGN KEY (re_screening) REFERENCES screenings(sc_id),
    UNIQUE KEY unique_reservation (re_user, re_screening)
);

CREATE USER 'cine_user'@'localhost' IDENTIFIED BY '12345';
GRANT SELECT, INSERT, UPDATE, DELETE ON cinehub.* TO 'cine_user'@'localhost';
FLUSH PRIVILEGES;

$2b$10$4uqDlBgtdxEhSCbgLfeDiu68nU1ND1ehdhg0f1GU3gED261DOKR1u

INSERT INTO users (us_username, us_password, us_email, us_role)
VALUES ('fred', '$2b$10$4uqDlBgtdxEhSCbgLfeDiu68nU1ND1ehdhg0f1GU3gED261DOKR1u', 'fred@gmail.fr', 'admin');

INSERT INTO films (fi_title, fi_description, fi_duration, fi_genre, fi_release_date, fi_is_showing)
VALUES ('Terminator', '!!!', 120, 'action', '1984-10-26', 1),
        ('Alien', '!!!', 128, 'horreur', '1992-05-11', 1),
        ('Ghostbusters', '!!!', 150, 'comedie', '1982-01-03', 0); 

INSERT INTO rooms (ro_name, ro_capacity)
VALUES ('Salle 1', 55), ('Salle 2', 25);

INSERT INTO screenings (sc_film, sc_room, sc_datetime, sc_price)
VALUES (1, 2, '2026-12-13 23:00:00', 20), (2, 1, '2026-12-13 21:00:00', 20), (3, 2, '2026-12-14 21:00:00', 20), (2, 2, '2026-12-15 21:00:00', 20);