import {ModelType} from "skinview-utils";
import {
	BoxGeometry,
	BufferAttribute,
	DoubleSide,
	FrontSide,
	Group,
	Mesh,
	MeshStandardMaterial,
	Object3D,
	Texture,
	Vector2,
} from "three";

function setUVs(
	box: BoxGeometry,
	u: number,
	v: number,
	width: number,
	height: number,
	depth: number,
	textureWidth: number,
	textureHeight: number
): void {
	const toFaceVertices = (x1: number, y1: number, x2: number, y2: number) => [
		new Vector2(x1 / textureWidth, 1.0 - y2 / textureHeight),
		new Vector2(x2 / textureWidth, 1.0 - y2 / textureHeight),
		new Vector2(x2 / textureWidth, 1.0 - y1 / textureHeight),
		new Vector2(x1 / textureWidth, 1.0 - y1 / textureHeight),
	];

	const top = toFaceVertices(u + depth, v, u + width + depth, v + depth);
	const bottom = toFaceVertices(
		u + width + depth,
		v,
		u + width * 2 + depth,
		v + depth
	);
	const left = toFaceVertices(u, v + depth, u + depth, v + depth + height);
	const front = toFaceVertices(
		u + depth,
		v + depth,
		u + width + depth,
		v + depth + height
	);
	const right = toFaceVertices(
		u + width + depth,
		v + depth,
		u + width + depth * 2,
		v + height + depth
	);
	const back = toFaceVertices(
		u + width + depth * 2,
		v + depth,
		u + width * 2 + depth * 2,
		v + height + depth
	);

	const uvAttr = box.attributes.uv as BufferAttribute;
	uvAttr.copyVector2sArray([
		right[3],
		right[2],
		right[0],
		right[1],
		left[3],
		left[2],
		left[0],
		left[1],
		top[3],
		top[2],
		top[0],
		top[1],
		bottom[0],
		bottom[1],
		bottom[3],
		bottom[2],
		front[3],
		front[2],
		front[0],
		front[1],
		back[3],
		back[2],
		back[0],
		back[1],
	]);
	uvAttr.needsUpdate = true;
}

function setSkinUVs(
	box: BoxGeometry,
	u: number,
	v: number,
	width: number,
	height: number,
	depth: number
): void {
	setUVs(box, u, v, width, height, depth, 64, 64);
}

function setCapeUVs(
	box: BoxGeometry,
	u: number,
	v: number,
	width: number,
	height: number,
	depth: number
): void {
	setUVs(box, u, v, width, height, depth, 64, 32);
}

/**
 * Notice that innerLayer and outerLayer may NOT be the direct children of the Group.
 */
export class BodyPart extends Group {
	cosmetics: Object3D

	constructor(readonly innerLayer: Object3D, readonly outerLayer: Object3D) {
		super();
		innerLayer.name = "inner";
		outerLayer.name = "outer";

		this.cosmetics = new Object3D()
		this.cosmetics.name = "cosmetics"
		this.add(this.cosmetics)
	}
}

export class SkinObject extends Group {
	// body parts
	readonly head: BodyPart;
	readonly body: BodyPart;
	readonly rightArm: BodyPart;
	readonly leftArm: BodyPart;
	readonly rightLeg: BodyPart;
	readonly leftLeg: BodyPart;

	private modelListeners: Array<() => void> = []; // called when model(slim property) is changed
	private slim = false;

	constructor(texture: Texture) {
		super();

		const layer1Material = new MeshStandardMaterial({
			map: texture,
			side: FrontSide,
		});
		const layer2Material = new MeshStandardMaterial({
			map: texture,
			side: DoubleSide,
			transparent: true,
			alphaTest: 1e-5,
		});

		const layer1MaterialBiased = layer1Material.clone();
		layer1MaterialBiased.polygonOffset = true;
		layer1MaterialBiased.polygonOffsetFactor = 1.0;
		layer1MaterialBiased.polygonOffsetUnits = 1.0;

		const layer2MaterialBiased = layer2Material.clone();
		layer2MaterialBiased.polygonOffset = true;
		layer2MaterialBiased.polygonOffsetFactor = 1.0;
		layer2MaterialBiased.polygonOffsetUnits = 1.0;

		// Head
		const headBox = new BoxGeometry(8, 8, 8);
		setSkinUVs(headBox, 0, 0, 8, 8, 8);
		const headMesh = new Mesh(headBox, layer1Material);

		const head2Box = new BoxGeometry(9, 9, 9);
		setSkinUVs(head2Box, 32, 0, 8, 8, 8);
		const head2Mesh = new Mesh(head2Box, layer2Material);

		this.head = new BodyPart(headMesh, head2Mesh);
		this.head.name = "head";
		this.head.add(headMesh, head2Mesh);
		headMesh.position.y = 4;
		head2Mesh.position.y = 4;
		this.add(this.head);

		// Body
		const bodyBox = new BoxGeometry(8, 12, 4);
		setSkinUVs(bodyBox, 16, 16, 8, 12, 4);
		const bodyMesh = new Mesh(bodyBox, layer1Material);

		const body2Box = new BoxGeometry(8.5, 12.5, 4.5);
		setSkinUVs(body2Box, 16, 32, 8, 12, 4);
		const body2Mesh = new Mesh(body2Box, layer2Material);

		this.body = new BodyPart(bodyMesh, body2Mesh);
		this.body.name = "body";
		this.body.add(bodyMesh, body2Mesh);
		this.body.position.y = -6;
		this.add(this.body);

		// Right Arm
		const rightArmBox = new BoxGeometry();
		const rightArmMesh = new Mesh(rightArmBox, layer1MaterialBiased);
		this.modelListeners.push(() => {
			rightArmMesh.scale.x = this.slim ? 3 : 4;
			rightArmMesh.scale.y = 12;
			rightArmMesh.scale.z = 4;
			setSkinUVs(rightArmBox, 40, 16, this.slim ? 3 : 4, 12, 4);
		});

		const rightArm2Box = new BoxGeometry();
		const rightArm2Mesh = new Mesh(rightArm2Box, layer2MaterialBiased);
		this.modelListeners.push(() => {
			rightArm2Mesh.scale.x = this.slim ? 3.5 : 4.5;
			rightArm2Mesh.scale.y = 12.5;
			rightArm2Mesh.scale.z = 4.5;
			setSkinUVs(rightArm2Box, 40, 32, this.slim ? 3 : 4, 12, 4);
		});

		const rightArmPivot = new Group();
		rightArmPivot.add(rightArmMesh, rightArm2Mesh);
		this.modelListeners.push(() => {
			rightArmPivot.position.x = this.slim ? -0.5 : -1;
		});
		rightArmPivot.position.y = -4;

		this.rightArm = new BodyPart(rightArmMesh, rightArm2Mesh);
		this.rightArm.name = "rightArm";
		this.rightArm.add(rightArmPivot);
		this.rightArm.position.x = -5;
		this.rightArm.position.y = -2;
		this.add(this.rightArm);

		// Left Arm
		const leftArmBox = new BoxGeometry();
		const leftArmMesh = new Mesh(leftArmBox, layer1MaterialBiased);
		this.modelListeners.push(() => {
			leftArmMesh.scale.x = this.slim ? 3 : 4;
			leftArmMesh.scale.y = 12;
			leftArmMesh.scale.z = 4;
			setSkinUVs(leftArmBox, 32, 48, this.slim ? 3 : 4, 12, 4);
		});

		const leftArm2Box = new BoxGeometry();
		const leftArm2Mesh = new Mesh(leftArm2Box, layer2MaterialBiased);
		this.modelListeners.push(() => {
			leftArm2Mesh.scale.x = this.slim ? 3.5 : 4.5;
			leftArm2Mesh.scale.y = 12.5;
			leftArm2Mesh.scale.z = 4.5;
			setSkinUVs(leftArm2Box, 48, 48, this.slim ? 3 : 4, 12, 4);
		});

		const leftArmPivot = new Group();
		leftArmPivot.add(leftArmMesh, leftArm2Mesh);
		this.modelListeners.push(() => {
			leftArmPivot.position.x = this.slim ? 0.5 : 1;
		});
		leftArmPivot.position.y = -4;

		this.leftArm = new BodyPart(leftArmMesh, leftArm2Mesh);
		this.leftArm.name = "leftArm";
		this.leftArm.add(leftArmPivot);
		this.leftArm.position.x = 5;
		this.leftArm.position.y = -2;
		this.add(this.leftArm);

		// Right Leg
		const rightLegBox = new BoxGeometry(4, 12, 4);
		setSkinUVs(rightLegBox, 0, 16, 4, 12, 4);
		const rightLegMesh = new Mesh(rightLegBox, layer1MaterialBiased);

		const rightLeg2Box = new BoxGeometry(4.5, 12.5, 4.5);
		setSkinUVs(rightLeg2Box, 0, 32, 4, 12, 4);
		const rightLeg2Mesh = new Mesh(rightLeg2Box, layer2MaterialBiased);

		const rightLegPivot = new Group();
		rightLegPivot.add(rightLegMesh, rightLeg2Mesh);
		rightLegPivot.position.y = -6;

		this.rightLeg = new BodyPart(rightLegMesh, rightLeg2Mesh);
		this.rightLeg.name = "rightLeg";
		this.rightLeg.add(rightLegPivot);
		this.rightLeg.position.x = -1.9;
		this.rightLeg.position.y = -12;
		this.rightLeg.position.z = -0.1;
		this.add(this.rightLeg);

		// Left Leg
		const leftLegBox = new BoxGeometry(4, 12, 4);
		setSkinUVs(leftLegBox, 16, 48, 4, 12, 4);
		const leftLegMesh = new Mesh(leftLegBox, layer1MaterialBiased);

		const leftLeg2Box = new BoxGeometry(4.5, 12.5, 4.5);
		setSkinUVs(leftLeg2Box, 0, 48, 4, 12, 4);
		const leftLeg2Mesh = new Mesh(leftLeg2Box, layer2MaterialBiased);

		const leftLegPivot = new Group();
		leftLegPivot.add(leftLegMesh, leftLeg2Mesh);
		leftLegPivot.position.y = -6;

		this.leftLeg = new BodyPart(leftLegMesh, leftLeg2Mesh);
		this.leftLeg.name = "leftLeg";
		this.leftLeg.add(leftLegPivot);
		this.leftLeg.position.x = 1.9;
		this.leftLeg.position.y = -12;
		this.leftLeg.position.z = -0.1;
		this.add(this.leftLeg);

		this.modelType = "default";
	}

	get modelType(): ModelType {
		return this.slim ? "slim" : "default";
	}

	set modelType(value: ModelType) {
		this.slim = value === "slim";
		this.modelListeners.forEach((listener) => listener());
	}

	private getBodyParts(): Array<BodyPart> {
		return this.children.filter(
			(it) => it instanceof BodyPart
		) as Array<BodyPart>;
	}

	setInnerLayerVisible(value: boolean): void {
		this.getBodyParts().forEach((part) => (part.innerLayer.visible = value));
	}

	setOuterLayerVisible(value: boolean): void {
		this.getBodyParts().forEach((part) => (part.outerLayer.visible = value));
	}
}

export class CapeObject extends Group {
	readonly cape: Mesh;

	constructor(texture: Texture) {
		super();

		const capeMaterial = new MeshStandardMaterial({
			map: texture,
			side: DoubleSide,
			transparent: true,
			alphaTest: 1e-5,
		});

		// +z (front) - inside of cape
		// -z (back) - outside of cape
		const capeBox = new BoxGeometry(10, 16, 1);
		setCapeUVs(capeBox, 0, 0, 10, 16, 1);
		this.cape = new Mesh(capeBox, capeMaterial);
		this.cape.position.y = -8;
		this.cape.position.z = 0.5;
		this.add(this.cape);
	}
}

export class ElytraObject extends Group {
	readonly leftWing: Group;
	readonly rightWing: Group;

	constructor(texture: Texture) {
		super();

		const elytraMaterial = new MeshStandardMaterial({
			map: texture,
			side: DoubleSide,
			transparent: true,
			alphaTest: 1e-5,
		});

		const leftWingBox = new BoxGeometry(12, 22, 4);
		setCapeUVs(leftWingBox, 22, 0, 10, 20, 2);
		const leftWingMesh = new Mesh(leftWingBox, elytraMaterial);
		leftWingMesh.position.x = -5;
		leftWingMesh.position.y = -10;
		leftWingMesh.position.z = -1;
		this.leftWing = new Group();
		this.leftWing.add(leftWingMesh);
		this.add(this.leftWing);

		const rightWingBox = new BoxGeometry(12, 22, 4);
		setCapeUVs(rightWingBox, 22, 0, 10, 20, 2);
		const rightWingMesh = new Mesh(rightWingBox, elytraMaterial);
		rightWingMesh.scale.x = -1;
		rightWingMesh.position.x = 5;
		rightWingMesh.position.y = -10;
		rightWingMesh.position.z = -1;
		this.rightWing = new Group();
		this.rightWing.add(rightWingMesh);
		this.add(this.rightWing);

		this.leftWing.position.x = 5;
		this.leftWing.rotation.x = 0.2617994;
		this.leftWing.rotation.y = 0.01; // to avoid z-fighting
		this.leftWing.rotation.z = 0.2617994;
		this.updateRightWing();
	}

	/**
	 * Mirrors the position & rotation of left wing,
	 * and apply them to the right wing.
	 */
	updateRightWing(): void {
		this.rightWing.position.x = -this.leftWing.position.x;
		this.rightWing.position.y = this.leftWing.position.y;
		this.rightWing.rotation.x = this.leftWing.rotation.x;
		this.rightWing.rotation.y = -this.leftWing.rotation.y;
		this.rightWing.rotation.z = -this.leftWing.rotation.z;
	}
}

export interface CfgModel {
	type: string;
	textureSize: number[]; // [x, y]
	models: Model[];
}

type AttachPoint = "head" | "body" | "rightArm" | "leftArm" | "rightLeg" | "leftLeg"

export interface Model {
	id: string;
	type: "ModelBox";
	attachTo: AttachPoint;
	translate: number[]; // [x, y, z]
	rotate: number[]; // [x, y, z]
	boxes: Box[];
}

export interface Box {
	coordinates: number[]; // [x1, y1, z1, x2, y2, z2]
	uvNorth: number[]; // [x1, y1, x2, y2]
	uvEast: number[]; // [x1, y1, x2, y2]
	uvSouth: number[]; // [x1, y1, x2, y2]
	uvWest: number[]; // [x1, y1, x2, y2]
	uvUp: number[]; // [x1, y1, x2, y2]
	uvDown: number[]; // [x1, y1, x2, y2]
}

export class Cosmetic {
	readonly head: Group = new Group();
	readonly body: Group = new Group();
	readonly rightArm: Group = new Group();
	readonly leftArm: Group = new Group();
	readonly rightLeg: Group = new Group();
	readonly leftLeg: Group = new Group();

	constructor(cfgModel: CfgModel, texture: Texture) {
		console.debug(cfgModel, texture)
		const cosmeticMaterial = new MeshStandardMaterial({
			map: texture,
			side: DoubleSide,
			transparent: true,
			alphaTest: 1e-5,
		});

		console.debug(cfgModel.textureSize)
		const [textureWidth, textureHeight] = cfgModel.textureSize;

		const toFaceVertices = (x1: number, y1: number, x2: number, y2: number) => [
			new Vector2(x1 / textureWidth, 1.0 - y2 / textureHeight),
			new Vector2(x2 / textureWidth, 1.0 - y2 / textureHeight),
			new Vector2(x2 / textureWidth, 1.0 - y1 / textureHeight),
			new Vector2(x1 / textureWidth, 1.0 - y1 / textureHeight),
		];

		for (const model of cfgModel.models) {
			for (const box of model.boxes) {
				const boxModel = new BoxGeometry(
					box.coordinates[3],
					box.coordinates[4],
					box.coordinates[5]
				);

				const {uvEast, uvWest, uvUp, uvDown, uvNorth, uvSouth} = box;
				const uvs = [uvEast, uvWest, uvUp, uvDown, uvNorth, uvSouth];

				const vectors = [];

				for (const uv of uvs) {
					const [u1, v1, u2, v2] = uv;

					const face = toFaceVertices(u1, v1, u2, v2);

					vectors.push(face[3]);
					vectors.push(face[2]);
					vectors.push(face[0]);
					vectors.push(face[1]);
				}

				const uvAttr = boxModel.attributes.uv as BufferAttribute;
				uvAttr.copyVector2sArray(vectors);
				uvAttr.needsUpdate = true;

				const boxMesh = new Mesh(boxModel, cosmeticMaterial);

				boxMesh.position.x = box.coordinates[0] + box.coordinates[3] / 2 - model.translate[0] + 0.25;
				boxMesh.position.y = box.coordinates[1] + box.coordinates[4] / 2 - model.translate[1];
				boxMesh.position.z = box.coordinates[2] + box.coordinates[5] / 2 - model.translate[2];

				this[model.attachTo].add(boxMesh)
				this[model.attachTo].name = `cosmetic_${model.attachTo}_${model.id}`
				this[model.attachTo].visible = true
			}
		}
	}
}

export class EarsObject extends Group {

	readonly rightEar: Mesh;
	readonly leftEar: Mesh;

	constructor(texture: Texture) {
		super();

		const material = new MeshStandardMaterial({
			map: texture,
			side: FrontSide
		});
		const earBox = new BoxGeometry(8, 8, 4 / 3);
		setUVs(earBox, 0, 0, 6, 6, 1, 14, 7);

		this.rightEar = new Mesh(earBox, material);
		this.rightEar.name = "rightEar";
		this.rightEar.position.x = -6;
		this.add(this.rightEar);

		this.leftEar = new Mesh(earBox, material);
		this.leftEar.name = "leftEar";
		this.leftEar.position.x = 6;
		this.add(this.leftEar);
	}
}

export type BackEquipment = "cape" | "elytra";

export class PlayerObject extends Group {
	readonly skin: SkinObject;
	readonly cape: CapeObject;
	readonly elytra: ElytraObject;
	readonly ears: EarsObject;

	constructor(skinTexture: Texture, capeTexture: Texture, earsTexture: Texture) {
		super();

		this.skin = new SkinObject(skinTexture);
		this.skin.name = "skin";
		this.skin.position.y = 0;
		this.add(this.skin);

		this.cape = new CapeObject(capeTexture);
		this.cape.name = "cape";
		this.cape.position.y = 0;
		this.cape.position.z = -2;
		this.cape.rotation.x = (10.8 * Math.PI) / 180;
		this.cape.rotation.y = Math.PI;
		this.add(this.cape);

		this.elytra = new ElytraObject(capeTexture);
		this.elytra.name = "elytra";
		this.elytra.position.y = 0;
		this.elytra.position.z = -2;
		this.elytra.visible = false;
		this.add(this.elytra);

		this.ears = new EarsObject(earsTexture);
		this.ears.name = "ears";
		this.ears.position.y = 2;
		this.ears.position.z = 2 / 3;
		this.ears.visible = false;
		this.skin.head.add(this.ears);
	}

	clearCosmetics(): void {
		this.skin.head.cosmetics.clear()
		this.skin.body.cosmetics.clear()
		this.skin.rightArm.cosmetics.clear()
		this.skin.leftArm.cosmetics.clear()
		this.skin.rightLeg.cosmetics.clear()
		this.skin.leftLeg.cosmetics.clear()
	}

	addCosmetic(cosmetic: Cosmetic): void {
		this.skin.head.cosmetics.add(cosmetic.head)
		this.skin.body.cosmetics.add(cosmetic.body)
		this.skin.rightArm.cosmetics.add(cosmetic.rightArm)
		this.skin.leftArm.cosmetics.add(cosmetic.leftArm)
		this.skin.rightLeg.cosmetics.add(cosmetic.rightLeg)
		this.skin.leftLeg.cosmetics.add(cosmetic.leftLeg)
	}

	get backEquipment(): BackEquipment | null {
		if (this.cape.visible) {
			return "cape";
		} else if (this.elytra.visible) {
			return "elytra";
		} else {
			return null;
		}
	}

	set backEquipment(value: BackEquipment | null) {
		this.cape.visible = value === "cape";
		this.elytra.visible = value === "elytra";
	}
}
