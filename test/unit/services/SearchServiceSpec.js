describe('localreads', function () {
    var bookService,$httpBackend;

    beforeEach(angular.mock.module('localreads'));

    describe('SearchService',
        function () {
            beforeEach(angular.mock.inject(function (BookService,$injector) {

                // inject the service
                bookService = BookService;

                /*$httpBackend  = $injector.get('$httpBackend');
                $httpBackend.whenGET("/books/search").respond({
                    data: {
                        children: [
                            {
                                data: {
                                    title: "Da Vinci Code",
                                    id:1
                                }
                            },
                            {
                                data: {
                                    title: "The Da Vinci Code",
                                    id:2
                                }
                            }

                        ]
                    }
                });*/
            }));

            it('has search results when search performed with non-empty string', function () {


                //$httpBackend.expectGET('/books/search');
                bookService.searchBooks("Da Vinci Code").then(function(titles){
                    expect(titles).toEqual(['Da Vinci Code','The Da Vinci Code']);
                });

                //$httpBackend.flush();
            });


    });

});
