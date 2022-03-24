import {CfgModel} from "./model";

export const EXAMPLE_MODEL: CfgModel = {
	type: "PlayerItem",
	textureSize: [32, 32],
	models: [
		{
			id: "Main",
			type: "ModelBox",
			attachTo: "head",
			translate: [0, -10, 0],
			rotate: [0, 0, 0],
			boxes: [
				// 1
				{
					coordinates: [-2.75, 1, 3.5, 5, 1, 1],
					uvNorth: [11, 12, 16, 13],
					uvEast: [10, 12, 11, 13],
					uvSouth: [17, 12, 22, 13],
					uvWest: [16, 12, 17, 13],
					uvUp: [16, 12, 11, 11],
					uvDown: [21, 11, 16, 12],
				},
				// 2
				{
					coordinates: [-3.75, 1, 2.5, 2, 1, 1],
					uvNorth: [11, 12, 13, 13],
					uvEast: [10, 12, 11, 13],
					uvSouth: [14, 12, 16, 13],
					uvWest: [13, 12, 14, 13],
					uvUp: [13, 12, 11, 11],
					uvDown: [15, 11, 13, 12],
				},

				// 3
				{
					coordinates: [-3.75, 1, 1.5, 1, 1, 1],
					uvNorth: [11, 12, 12, 13],
					uvEast: [10, 12, 11, 13],
					uvSouth: [13, 12, 14, 13],
					uvWest: [12, 12, 13, 13],
					uvUp: [12, 12, 11, 11],
					uvDown: [13, 11, 12, 12],
				},

				// 4
				{
					coordinates: [-4.75, 1, -2.5, 1, 1, 5],
					uvNorth: [15, 16, 16, 17],
					uvEast: [10, 16, 15, 17],
					uvSouth: [21, 16, 22, 17],
					uvWest: [16, 16, 21, 17],
					uvUp: [16, 16, 15, 11],
					uvDown: [17, 11, 16, 16],
				},

				// 5

				{
					coordinates: [-3.75, 1, -2.5, 1, 1, 1],
					uvNorth: [12, 13, 13, 14],
					uvEast: [10, 13, 12, 14],
					uvSouth: [15, 13, 16, 14],
					uvWest: [13, 13, 15, 14],
					uvUp: [13, 13, 12, 11],
					uvDown: [14, 11, 13, 13],
				},
				// 6
				{
					coordinates: [-3.75, 1, -3.5, 2, 1, 1],
					uvNorth: [11, 12, 13, 13],
					uvEast: [10, 12, 11, 13],
					uvSouth: [14, 12, 16, 13],
					uvWest: [13, 12, 14, 13],
					uvUp: [13, 12, 11, 11],
					uvDown: [15, 11, 13, 12],
				},

				// 7
				{
					coordinates: [-2.75, 1, -4.5, 5, 1, 1],
					uvNorth: [11, 12, 16, 13],
					uvEast: [10, 12, 11, 13],
					uvSouth: [17, 12, 22, 13],
					uvWest: [16, 12, 17, 13],
					uvUp: [16, 12, 11, 11],
					uvDown: [21, 11, 16, 12],
				},
				// 8
				{
					coordinates: [1.25, 1, -3.5, 2, 1, 1],
					uvNorth: [11, 12, 12, 13],
					uvEast: [10, 12, 11, 13],
					uvSouth: [13, 12, 14, 13],
					uvWest: [12, 12, 13, 13],
					uvUp: [12, 12, 11, 11],
					uvDown: [13, 11, 12, 12],
				},
				// 9
				{
					coordinates: [2.25, 1, -2.5, 1, 1, 1],
					uvNorth: [12, 13, 13, 14],
					uvEast: [10, 13, 12, 14],
					uvSouth: [15, 13, 16, 14],
					uvWest: [13, 13, 15, 14],
					uvUp: [13, 13, 12, 11],
					uvDown: [14, 11, 13, 13],
				},

				// 10
				{
					coordinates: [3.25, 1, -2.5, 1, 1, 5],
					uvNorth: [15, 16, 16, 17],
					uvEast: [10, 16, 15, 17],
					uvSouth: [21, 16, 22, 17],
					uvWest: [16, 16, 21, 17],
					uvUp: [16, 16, 15, 11],
					uvDown: [17, 11, 16, 16],
				},

				// 11
				{
					coordinates: [2.25, 1, 1.5, 1, 1, 1],
					uvNorth: [12, 13, 13, 14],
					uvEast: [10, 13, 12, 14],
					uvSouth: [15, 13, 16, 14],
					uvWest: [13, 13, 15, 14],
					uvUp: [13, 13, 12, 11],
					uvDown: [14, 11, 13, 13],
				},

				// 12
				{
					coordinates: [1.25, 1, 2.5, 2, 1, 1],
					uvNorth: [11, 12, 12, 13],
					uvEast: [10, 12, 11, 13],
					uvSouth: [13, 12, 14, 13],
					uvWest: [12, 12, 13, 13],
					uvUp: [12, 12, 11, 11],
					uvDown: [13, 11, 12, 12],
				},
			],
		},
	],
};

export const EXAMPLE_MODEL_2: CfgModel = {
	type: "PlayerItem",
	textureSize: [32, 32],
	models: [
		{
			id: "Main",
			type: "ModelBox",
			attachTo: "head",
			translate: [0, -8, 0],
			rotate: [0, 0, 0],
			boxes: [
				// 1
				{
					coordinates: [-2.75, 1, 3.5, 5, 1, 1],
					uvNorth: [11, 12, 16, 13],
					uvEast: [10, 12, 11, 13],
					uvSouth: [17, 12, 22, 13],
					uvWest: [16, 12, 17, 13],
					uvUp: [16, 12, 11, 11],
					uvDown: [21, 11, 16, 12],
				},
				// 2
				{
					coordinates: [-3.75, 1, 2.5, 2, 1, 1],
					uvNorth: [11, 12, 13, 13],
					uvEast: [10, 12, 11, 13],
					uvSouth: [14, 12, 16, 13],
					uvWest: [13, 12, 14, 13],
					uvUp: [13, 12, 11, 11],
					uvDown: [15, 11, 13, 12],
				},

				// 3
				{
					coordinates: [-3.75, 1, 1.5, 1, 1, 1],
					uvNorth: [11, 12, 12, 13],
					uvEast: [10, 12, 11, 13],
					uvSouth: [13, 12, 14, 13],
					uvWest: [12, 12, 13, 13],
					uvUp: [12, 12, 11, 11],
					uvDown: [13, 11, 12, 12],
				},

				// 4
				{
					coordinates: [-4.75, 1, -2.5, 1, 1, 5],
					uvNorth: [15, 16, 16, 17],
					uvEast: [10, 16, 15, 17],
					uvSouth: [21, 16, 22, 17],
					uvWest: [16, 16, 21, 17],
					uvUp: [16, 16, 15, 11],
					uvDown: [17, 11, 16, 16],
				},

				// 5

				{
					coordinates: [-3.75, 1, -2.5, 1, 1, 1],
					uvNorth: [12, 13, 13, 14],
					uvEast: [10, 13, 12, 14],
					uvSouth: [15, 13, 16, 14],
					uvWest: [13, 13, 15, 14],
					uvUp: [13, 13, 12, 11],
					uvDown: [14, 11, 13, 13],
				},
				// 6
				{
					coordinates: [-3.75, 1, -3.5, 2, 1, 1],
					uvNorth: [11, 12, 13, 13],
					uvEast: [10, 12, 11, 13],
					uvSouth: [14, 12, 16, 13],
					uvWest: [13, 12, 14, 13],
					uvUp: [13, 12, 11, 11],
					uvDown: [15, 11, 13, 12],
				},

				// 7
				{
					coordinates: [-2.75, 1, -4.5, 5, 1, 1],
					uvNorth: [11, 12, 16, 13],
					uvEast: [10, 12, 11, 13],
					uvSouth: [17, 12, 22, 13],
					uvWest: [16, 12, 17, 13],
					uvUp: [16, 12, 11, 11],
					uvDown: [21, 11, 16, 12],
				},
				// 8
				{
					coordinates: [1.25, 1, -3.5, 2, 1, 1],
					uvNorth: [11, 12, 12, 13],
					uvEast: [10, 12, 11, 13],
					uvSouth: [13, 12, 14, 13],
					uvWest: [12, 12, 13, 13],
					uvUp: [12, 12, 11, 11],
					uvDown: [13, 11, 12, 12],
				},
				// 9
				{
					coordinates: [2.25, 1, -2.5, 1, 1, 1],
					uvNorth: [12, 13, 13, 14],
					uvEast: [10, 13, 12, 14],
					uvSouth: [15, 13, 16, 14],
					uvWest: [13, 13, 15, 14],
					uvUp: [13, 13, 12, 11],
					uvDown: [14, 11, 13, 13],
				},

				// 10
				{
					coordinates: [3.25, 1, -2.5, 1, 1, 5],
					uvNorth: [15, 16, 16, 17],
					uvEast: [10, 16, 15, 17],
					uvSouth: [21, 16, 22, 17],
					uvWest: [16, 16, 21, 17],
					uvUp: [16, 16, 15, 11],
					uvDown: [17, 11, 16, 16],
				},

				// 11
				{
					coordinates: [2.25, 1, 1.5, 1, 1, 1],
					uvNorth: [12, 13, 13, 14],
					uvEast: [10, 13, 12, 14],
					uvSouth: [15, 13, 16, 14],
					uvWest: [13, 13, 15, 14],
					uvUp: [13, 13, 12, 11],
					uvDown: [14, 11, 13, 13],
				},

				// 12
				{
					coordinates: [1.25, 1, 2.5, 2, 1, 1],
					uvNorth: [11, 12, 12, 13],
					uvEast: [10, 12, 11, 13],
					uvSouth: [13, 12, 14, 13],
					uvWest: [12, 12, 13, 13],
					uvUp: [12, 12, 11, 11],
					uvDown: [13, 11, 12, 12],
				},
			],
		},
	],
};
