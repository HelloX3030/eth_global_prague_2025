// import { create } from 'zustand';
// import { storage } from '../storage/mmkv';

// interface Challenge {
//   id: number;
//   title: string;
//   description: string;
//   latitude: number;
//   longitude: number;
//   createdAt: string;
//   updatedAt: string;
//   completed: boolean;
//   creator: string;
// }

// interface Score {
// 	id: number;
// 	value: number;
// 	valueDescription?: string;
// 	createdAt: string;
// 	longitude: number;
// 	latitude: number;
// 	title: string;
// 	description: string;
// }

// interface User {
// 	id: string;
// 	name: string;
// 	profilePicture: string;
// 	scores: Score[];
// }

// interface UserStore {
//   user: User | null;
//   setUser: (user: User) => void;
//   logout: () => void;
//   hydrate: () => void;
// }

// export const useUserStore = create<UserStore>((set) => ({
// 	user: null,

// 	setUser: (user) => {
// 		storage.set('user', JSON.stringify(user));
// 		set({ user });
// 	},

// 	logout: () => {
// 		storage.delete('user');
// 		set({ user: null });
// 	},

// 	hydrate: () => {
// 		const raw = storage.getString('user');
// 		if (raw) {
// 			const parsed: User = JSON.parse(raw);
// 			set({ user: parsed });
// 		}
// 	},
// }));

// export const useChallengesStore = create<{
//   challenges: Challenge[];
//   setChallenges: (challenges: Challenge[]) => void;
//   addChallenge: (challenge: Challenge) => void;
// }>((set) => ({
//   challenges: [],
//   setChallenges: (challenges) => set({ challenges }),
//   addChallenge: (challenge) =>
// 	set((state) => ({ challenges: [...state.challenges, challenge] })),
// }));

// export const useScoresStore = create<{
//   scores: Score[];
//   setScores: (scores: Score[]) => void;
//   addScore: (score: Score) => void;
// }>((set) => ({
//   scores: [],
//   setScores: (scores) => set({ scores }),
//   addScore: (score) =>
// 	set((state) => ({ scores: [...state.scores, score] })),
// }));

