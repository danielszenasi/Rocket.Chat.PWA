import { Rocket.Chat.PWAPage } from './app.po';

describe('rocket.chat.pwa App', () => {
  let page: Rocket.Chat.PWAPage;

  beforeEach(() => {
    page = new Rocket.Chat.PWAPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
