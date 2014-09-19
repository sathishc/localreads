/**
 * Created by SatSang on 9/18/14.
 */
// spec.js
describe('Inbox Page', function() {

    var InboxPage = function() {


        this.conversations = element.all(by.repeater('conversation in inboxModel.conversations'));

        this.get = function() {
            browser.get('http://localhost:8100/#/app/inbox');
            browser.sleep(5000);
        };
    };

    var inboxPage;


    it('should load the inbox page url', function() {
        inboxPage = new InboxPage();
        inboxPage.get();

        expect(browser.getTitle()).toEqual('http://localhost:8100/#/app/inbox');
    });

    it('should have a list of conversations', function() {

        expect(inboxPage.conversations.count()).toBeGreaterThan(0);
    });

});

