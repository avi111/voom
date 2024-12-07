An application that keeps users who are interested in drones up to date on the latest news. 
the program logs news headlines, and responds to queries about them.
the stream of the latest worldwide news on drones, are stores in a local sqlite db
web page that shows those recent news headlines to the user and allows them to search them.

An http server that responds to requests with the latest news was made with the following endpoints:

1. getting news, with a search term. if the term is empty, it will return the latest news regardless a query
2. getting news by author plus author bio. if there is no bio or no articles, it will return "not found bio" or "no articles". bio is taken from wikipedia (so might be inaccurate)

A scheduled task is fetching news periofically
