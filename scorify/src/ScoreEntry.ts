export type LatLng = [number, number];

export class ScoreEntry {
	name: string;
	time: Date;
	score: number;
	worldPosition: LatLng;
	price: number;
	cost?: number;

	constructor(
		name: string,
		time: Date,
		score: number,
		worldPosition: LatLng,
		price: number,
		cost: number = 0
	) {
		this.name = name;
		this.time = time;
		this.score = score;
		this.worldPosition = worldPosition;
		this.price = price;
		this.cost = cost;
	}
}

export const scoreEntries: ScoreEntry[] = [
	new ScoreEntry(
		"Central Park Sprint",
		new Date("2025-06-01T10:00:00Z"),
		1200,
		[40.785091, -73.968285],
		50,
		5
	),
	new ScoreEntry(
		"Hollywood Hills Challenge",
		new Date("2025-06-01T11:30:00Z"),
		900,
		[34.134115, -118.321548],
		0
	), // score < 1000, price 0
	new ScoreEntry(
		"London Bridge Dash",
		new Date("2025-06-01T12:15:00Z"),
		1500,
		[51.507879, -0.087732],
		75,
		10
	),
	new ScoreEntry(
		"Eiffel Tower Climb",
		new Date("2025-06-02T09:00:00Z"),
		1100,
		[48.858370, 2.294481],
		60
	),
	new ScoreEntry(
		"Sydney Opera Run",
		new Date("2025-06-02T14:45:00Z"),
		1300,
		[-33.856784, 151.215297],
		70,
		7
	),
];
