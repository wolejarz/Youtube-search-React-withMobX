# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Project reads description of 3 hardcoded channels.
## User can select which channel is searchable.
## After search list of videos os displayed.
##  User can hide or watch video.
## It's necessary to eneter Youtube API key in the file ./src/context/types.js
## Application was tested in Chrome

## What is the goal ?

1. At the top, I want a list of my favorite comedy shows (YouTube channels). The list of
shows will be hardcoded in this challenge (see below)
2. I want to be able to select zero, one, or more of those shows
3. There should be a Search button
4. When I click Search, it means I want to watch clips from the selected shows (only), or:
5. If no shows have been selected, the application should behave as if all shows have been
selected.
6. The application must then search YouTube for available clips in all the shows that have
been selected
7. For N shows, the searches must be performed as N asynchronous requests
8. As results come in, clips should immediately be displayed in a single interleaved list
(below the list of shows).
9. In the clip list, you do not need to show more information than the full clip description
(e.g. “GOP Senators Warned About Trump’s Violence – Now They’re Ignoring It”), with
the date (year, month, and day, in that order) below the description.
10. The list of clips must be time-sorted, with the newest shows at the top
11. The list of clips must never contain more than 10 items in total
12. Each entry in the clip list must have a Hide button
13. If I click the Hide button for a clip, the clip should be removed from the list
14. A hidden clip should never be shown again (e.g. if another search is performed)
15. If I click anywhere on the clip description/date, the clip video should appear to the right
of the clip list, and the clip should immediately be removed from the list as if I had
pressed Hide
16. I have total recall, so once I’ve seen a clip I will never want to see it again, no need to be
able to “recover” watched/hidden clips �
17. You should not make the history of watched/hidden clips persist across reloads.
18. You do not need to refill the list so it still has 10 entries after I hide/watch a clip, it only
needs to fill up whenever I press Search.
19. If I start changing the selection of shows, keep the latest search results in place until I
press Search again.
20. Do not use any CSS/component frameworks/libraries. You may use only hand-crafted
CSS (or SASS etc).
21. The project should be written in “pure” React – with Mobx,
22. You may use external packages for implementation of things such as fetching data
