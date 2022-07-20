export const toRad = (degree) => (Math.PI * degree) / 180;
export const toDeg = (radian) => (radian * 180) / Math.PI;

export const random = (min, max) => min + Math.random() * (max - min);
