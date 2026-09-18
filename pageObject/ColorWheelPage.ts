import { Page, Locator } from "@playwright/test";

export class ColorWheelPage {
  private page: Page;

  readonly url = "https://practice.expandtesting.com/color-wheel";
  readonly playGameButton: Locator;
  readonly resetButton: Locator;
  readonly allButtons: Locator;
  readonly feedback: Locator;

  constructor(page: Page) {
    this.page = page;

    this.playGameButton = page.getByRole("button", { name: /play game/i });
    this.resetButton = page.getByRole("button", { name: /reset game/i });
    this.allButtons = page.getByRole("button");
    this.feedback = page.locator("h3, [role='status'], [data-testid='result']");
  }

  async open() {
    await this.page.goto(this.url);
  }

  async startGameIfVisible() {
    if (await this.playGameButton.isVisible()) {
      await this.playGameButton.click();
    }
  }

  async getColorButtons(): Promise<Locator[]> {
    // Filter out "Play Game" & "Reset Game"
    return await this.allButtons
      .filter({ hasNotText: /^(play game|reset game)$/i })
      .all();
  }

  async clickColorButton(btn: Locator): Promise<{ name: string; feedback: string | null }> {
    const name = (await btn.innerText()).trim();
    await btn.click();

    if (await this.feedback.first().isVisible()) {
      const text = (await this.feedback.first().innerText()).trim();
      return { name, feedback: text };
    }

    return { name, feedback: null };
  }
}