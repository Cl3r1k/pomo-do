import { AppPage } from './app.po';

describe('pomo-do App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display Todo message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Todo list(v_0.0.3)');
    });
});

// TODO: Update e2e test