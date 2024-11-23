import { dbName } from "./service";
import * as SQLite from "expo-sqlite";

export const seedDB = async () => {
  console.log("seeding!!");
  try {
    await seedCDA();
    await seedJournal();
    await seedRelax();
  } catch (err) {
    console.error(err);
  }

  console.log("seeded!!");
};

const seedCDA = async () => {
  const db = await SQLite.openDatabaseAsync(dbName);

  try {
    await db.execAsync(`INSERT INTO cdaArchive (situation, oldThought, distortion, newThought, datetime)
                        VALUES
                            ('Meeting deadline', 'I will fail', 'Catastrophizing', 'I can handle it', '2020-01-15 10:00:00'),
                            ('Presentation', 'I will embarrass myself', 'Mind Reading', 'I am prepared', '2021-02-10 14:00:00'),
                            ('Argument with friend', 'They hate me now', 'All-or-Nothing Thinking', 'We can resolve this', '2022-03-05 16:30:00'),
                            ('Big exam', 'I will flunk', 'Overgeneralization', 'I have studied well', '2023-04-20 09:00:00'),
                            ('Social event', 'I will be awkward', 'Fortune Telling', 'I can enjoy the moment', '2023-05-22 18:00:00'),
                            ('Work evaluation', 'They will criticize everything', 'Magnification', 'I have done my best', '2023-06-15 11:00:00'),
                            ('Family gathering', 'They will judge me', 'Personalization', 'It’s about connection, not perfection', '2023-07-10 13:45:00'),
                            ('Public speaking', 'I will stutter', 'Labeling', 'I am a capable speaker', '2023-08-18 15:00:00'),
                            ('Job application', 'I am not good enough', 'Emotional Reasoning', 'I have valuable skills', '2023-09-25 10:30:00'),
                            ('Networking event', 'Nobody will talk to me', 'Jumping to Conclusions', 'I will make meaningful connections', '2023-10-05 19:00:00'), 
                            ('Cooking dinner', 'I will ruin the recipe', 'Catastrophizing', 'I can follow instructions', '2022-11-01 17:00:00'),
                            ('Trying a new hobby', 'I will fail', 'Overgeneralization', 'Everyone starts somewhere', '2023-01-02 11:00:00'),
                            ('Gym session', 'I am too weak', 'Labeling', 'I am improving with practice', '2023-02-15 08:00:00'),
                            ('Parenting moment', 'I am a bad parent', 'Personalization', 'I am doing my best', '2023-03-12 14:00:00'),
                            ('Financial planning', 'I am terrible with money', 'Overgeneralization', 'I am learning better skills', '2023-04-30 18:30:00'),
                            ('Vacation planning', 'Something will go wrong', 'Fortune Telling', 'I can adapt as needed', '2023-05-25 10:00:00'),
                            ('Health checkup', 'The results will be bad', 'Magnification', 'I am taking care of myself', '2023-06-20 09:30:00'),
                            ('Birthday party', 'Nobody will come', 'Jumping to Conclusions', 'I have friends who care about me', '2023-07-04 15:00:00'),
                            ('Online course', 'I will fall behind', 'All-or-Nothing Thinking', 'I can pace myself', '2023-08-18 11:45:00'),
                            ('Team project', 'I will let them down', 'Emotional Reasoning', 'I am contributing my part', '2023-09-10 16:00:00');
                    `);
  } catch (err) {
    console.error(err);
  }
};

const seedJournal = async () => {
  const db = await SQLite.openDatabaseAsync(dbName);
  try {
    await db.execAsync(`INSERT INTO journalEntries (moodValue, note, datetime)
                VALUES
                    (7, 'Feeling good about my progress', '2022-01-05 10:00:00'),
                    (4, 'Rough day at work', '2022-02-12 18:00:00'),
                    (8, 'Had a great time with friends', '2022-03-25 20:00:00'),
                    (3, 'Stressed about deadlines', '2022-04-10 15:00:00'),
                    (5, 'Average day', '2022-05-18 12:00:00'),
                    (6, 'Enjoyed a long walk', '2022-06-10 08:00:00'),
                    (9, 'Celebrated a promotion', '2022-07-15 14:00:00'),
                    (2, 'Felt overwhelmed', '2022-08-22 21:00:00'),
                    (7, 'Watched a comforting movie', '2022-09-30 19:00:00'),
                    (5, 'Cooked a new recipe', '2022-10-20 17:30:00'),
                    (4, 'Missed an important meeting', '2022-11-11 16:00:00'),
                    (6, 'Had a fun workout session', '2022-12-01 10:00:00'),
                    (8, 'Got a surprise gift', '2023-01-10 13:00:00'),
                    (3, 'Fought with a friend', '2023-02-20 20:00:00'),
                    (7, 'Went on a nature trip', '2023-03-30 09:30:00'),
                    (9, 'Started a new book', '2023-04-25 16:45:00');`);

    await db.execAsync(`INSERT INTO journalEntryEmotions (id, name, strength)
                VALUES
                    (1, 'Happiness', 80),
                    (2, 'Frustration', 60),
                    (3, 'Joy', 90),
                    (4, 'Stress', 70),
                    (5, 'Calmness', 50),
                    (6, 'Excitement', 70),
                    (7, 'Pride', 95),
                    (8, 'Anxiety', 50),
                    (9, 'Contentment', 85),
                    (10, 'Curiosity', 75),
                    (11, 'Disappointment', 40),
                    (12, 'Hope', 65),
                    (13, 'Relief', 60),
                    (14, 'Anger', 45),
                    (15, 'Admiration', 80),
                    (16, 'Enthusiasm', 85),
                    (17, 'Guilt', 55),
                    (18, 'Relaxation', 70),
                    (19, 'Gratitude', 95),
                    (20, 'Love', 90);`);
  } catch (err) {
    console.error(err);
  }
};

const seedRelax = async () => {
  const db = await SQLite.openDatabaseAsync(dbName);
  try {
    await db.execAsync(`INSERT INTO relaxActivities (activityName, secondsRelaxed, datetime)
                VALUES
                    ('breathing', 600, '2020-02-05 08:00:00'),
                    ('breathing', 900, '2021-03-10 07:30:00'),
                    ('breathing', 300, '2021-04-15 09:00:00'),
                    ('breathing', 1200, '2022-05-20 18:00:00'),
                    ('breathing', 1500, '2023-06-25 21:00:00'),
                    ('breathing', 1800, '2022-07-15 10:00:00'),
                    ('breathing', 1200, '2022-08-20 11:30:00'),
                    ('breathing', 900, '2022-09-25 08:45:00'),
                    ('breathing', 600, '2022-10-30 16:00:00'),
                    ('breathing', 300, '2023-01-05 19:30:00'),
                    ('breathing', 1200, '2023-02-10 14:15:00'),
                    ('breathing', 600, '2023-03-15 07:45:00'),
                    ('breathing', 900, '2023-04-20 20:30:00'),
                    ('breathing', 1800, '2023-05-25 09:15:00'),
                    ('breathing', 1500, '2023-06-30 18:30:00'),
                    ('breathing', 1200, '2023-07-05 17:00:00');`);
  } catch (err) {
    console.error(err);
  }
};
