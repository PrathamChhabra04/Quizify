const DB_NAME = "QuizDB";
const DB_VERSION = 1;
const ATTEMPTS_STORE = "attempts";
const QUIZZES_STORE = "quizzes";

interface AttemptData {
  id?: number;
  quizId: string;
  quizTitle: string;
  userName: string;
  score: number;
  attemptedQuestions: number;
  totalQuestions: number;
  timePerQuestion: number[];
  date: string;
}

export interface QuizQuestion {
  text: string;
  options?: string[]; // Only for MCQ
  correctAnswer: string | number;
  type: "mcq" | "integer";
}

export interface QuizData {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(ATTEMPTS_STORE)) {
        const store = db.createObjectStore(ATTEMPTS_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("quizId", "quizId", { unique: false });
        store.createIndex("date", "date", { unique: false });
      }
      if (!db.objectStoreNames.contains(QUIZZES_STORE)) {
        db.createObjectStore(QUIZZES_STORE, { keyPath: "id" });
      }
    };
  });
};

export const saveAttempt = async (attemptData: AttemptData) => {
  const db = (await initDB()) as IDBDatabase;
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ATTEMPTS_STORE, "readwrite");
    const store = transaction.objectStore(ATTEMPTS_STORE);
    const request = store.add(attemptData);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getAttempts = async (quizId?: string) => {
  const db = (await initDB()) as IDBDatabase;
  return new Promise<AttemptData[]>((resolve, reject) => {
    const transaction = db.transaction(ATTEMPTS_STORE, "readonly");
    const store = transaction.objectStore(ATTEMPTS_STORE);
    const request = store.getAll();

    request.onsuccess = () => {
      const attempts = request.result;
      if (quizId) {
        resolve(attempts.filter((attempt) => attempt.quizId === quizId));
      } else {
        resolve(attempts);
      }
    };
    request.onerror = () => reject(request.error);
  });
};

export const saveQuiz = async (quiz: QuizData) => {
  const db = (await initDB()) as IDBDatabase;
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(QUIZZES_STORE, "readwrite");
    const store = transaction.objectStore(QUIZZES_STORE);
    const request = store.put(quiz);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getAllQuizzes = async (): Promise<QuizData[]> => {
  const db = (await initDB()) as IDBDatabase;
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(QUIZZES_STORE, "readonly");
    const store = transaction.objectStore(QUIZZES_STORE);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getQuizById = async (id: string): Promise<QuizData | undefined> => {
  const db = (await initDB()) as IDBDatabase;
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(QUIZZES_STORE, "readonly");
    const store = transaction.objectStore(QUIZZES_STORE);
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
