import { MathUtils, type Matrix4, type OrthographicCamera } from "three";

export function badgeBaseZoom(width: number, height: number) {
  return Math.min(width / 2.83, height / 4.75);
}

export function fitBadgeInFrame(
  camera: OrthographicCamera,
  badgeMatrix: Matrix4,
  baseZoom: number,
  leftSpace: number,
  rightSpace: number,
  delta: number,
) {
  const matrix = badgeMatrix.elements;
  // Project a box that contains the printed badge and its clasp onto the camera X axis.
  const center = matrix[12] + matrix[4] * 0.13;
  const extent = Math.abs(matrix[0]) * 1.1 + Math.abs(matrix[4]) * 1.68 + Math.abs(matrix[8]) * 0.09;
  const safeZoom = Math.min(
    baseZoom,
    Math.max(1, leftSpace - 16) / Math.max(0.01, extent - center),
    Math.max(1, rightSpace - 16) / Math.max(0.01, extent + center),
  );
  // Keep the edge in frame immediately and ease back to the original size.
  const zoom = Math.min(safeZoom, MathUtils.damp(camera.zoom, baseZoom, 4, delta));
  if (Math.abs(zoom - camera.zoom) < 0.001 && camera.zoom <= safeZoom) return;
  camera.zoom = zoom;
  camera.updateProjectionMatrix();
}
