import { test } from "@playwright/test";
import { DragDropPage } from "../pageObject/DragDropPage";
import { DragDropCirclesPage } from "../pageObject/DragDropCirclesPage";

test("Drag & Drop Boxes", async ({ page }) => {
  const dd = new DragDropPage(page);

  await dd.open();
  await dd.dragAtoB();
});

test("Drag & Drop Circles", async ({ page }) => {
  const circles = new DragDropCirclesPage(page);

  await circles.open();
  await circles.dragAll();
});