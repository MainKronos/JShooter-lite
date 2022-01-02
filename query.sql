DROP DATABASE IF EXISTS JShooter;
CREATE DATABASE JShooter;
USE JShooter;



CREATE TABLE User(
    username varchar(255) primary key,
    pass varchar(255)
);

CREATE TABLE Map(
    ID_map int AUTO_INCREMENT primary key,
    map json
);

-- Dati -----------------------------------------------

INSERT INTO User value
('MainKronos', '$2y$10$.t5FkYvo6uuBZX9Fs1yaB.XgwGcSPB1Y79TvpLEDcCKqNwBed17d6'); -- 123

INSERT INTO Map(map) values 
('[
	"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
	"W       W                             W",
	"W   P   W  E        E           E     W",
	"W       W                             W",
	"W       W           E     WWWWWWWWWWWWW",
	"W     WWW                             W",
	"W                   E                 W",
	"W                               E     W",
	"W                                     W",
	"WWWWWWWWWWWWWWWWWWWWWWWWWWW           W",
	"W                         W           W",
	"W     E     E             W           W",
	"W                   E     W           W",
	"WWWWWWWWWWWWW             W           W",
	"W                         W           W",
	"W               WWWWWWWWWWW           W",
	"W                         W           W",
	"W                                     W",
	"W           W                         W",
	"W           W                         W",
	"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
]'),
('[
	"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
	"W       W                             W",
	"W   P   W  E                    E     W",
	"W       W                             W",
	"W       W       W                     W",
	"W       W       W                     W",
	"W       W       W                     W",
	"W       W   E   W               E     W",
	"W       W       W                     W",
	"W       W       WWWWWWWWWWW           W",
	"W       W                 W           W",
	"W       W   E             W           W",
	"W       W           E     W           W",
	"W       W                 W           W",
	"W       W   E    E        W           W",
	"W       W                 W           W",
	"W       WWWWWWWWWWWWWWWWWWW           W",
	"W                                     W",
	"W                                     W",
	"W                                     W",
	"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
]'),
('[
	"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
	"W                                     W",
	"W                                     W",
	"W  WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW  W",
	"W                           W   E     W",
	"W                           W         W",
	"W  WWWWWWWWWWWWWWWWWWWWWWW  WWWWWWWW  W",
	"W             W                    W  W",
	"W             W                    W  W",
	"WWWWWWWWWWWWWWWWWWWWWWWW  WW E W E W  W",
	"W     W E W            W   WWWWWWWWW  W",
	"W         W       P    W   W       W  W",
	"W  W      W  W         W E W       W  W",
	"W  WWWWWWWW  WWWWWWWWWWWWWWW  WWW  W  W",
	"W      W       W     W     W  WWW  W  W",
	"W      W                      WE      W",
	"W  W E W    W     W     W     W       W",
	"W  WWWWWWW  WWWWWWWWWWWWWWWWWWWWWWW  WW",
	"W           W          E              W",
	"W           W     E            E      W",
	"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
]')