# Birdie Developer Test

# Usage 
to get the code running locally, clone the repo, then `cd` into `backend` and `frontend` in 2 separate terminals and run `npm i` in both. after that run `npm run dev` in `backend` and `npm start` in `frontend`.

CRA should open the react app in your browser ready for you to play with it. 

On the first screen you can choose which care recipient to view the observation events for using the `select`. You will then be taken to the observations page which initially displays a timeline of all observation events for that care recipient. You can use the additive select at the top of the page to filter the types of observations you see, and choose multiple types of observations at a time, and clear the filters one at a time or all at once. The observations are limited to 5 per page and paginated for the sake of reading.

The app is deployed here: https://care-api-fe.onrender.com/ on Render.

# Technical approach
I began by looking into the data itself to see figure out what my MVP should be. I decided that we needed to return care recipieints to the fron-end so that a family member could choose which recipient they wanted to see the observations for if they had multiple family members being cared for. Once we had a care recipient selected we needed to be able to display the observation events from the events table, and we should do this by passing the care recipient's id as a url param to the api, from here we could query the database to return events that matched the id. I didn't think we would ever need to query the care givers table via the api for what we are using the data for because we could just add a sequelize relationship to include the care giver info when querying the events. I also thought it would be nice to have an endpoint to just return one care recipient from the api, using the care recipient id like with the observations, for the sake of being able to refresh the front-end after a care-recipient has been chosen, amongst other things.

I started by learning about `sequelize` as I've never used it before and it seemed like a popular choice with good docs and then began with top down approach for building the API. I build the route to get all the care recipients, then a single care recipient using the id and tested them using Insomnia. I then moved on to the observations endpoint which queries the events table. I decided on this name because it felt more semantic than querying an `events/` endpoint, even though that would be more RESTful. It does use the `eventsController` however as that is the table that is being queried. Once I had all observations being returned I narrowed the search to exclude `no_medication_observation_received` event_types as these didn't feel relevant to a family member, and then implemented the `Caregiver` relationship. Then I implemented some very simple pagination to make the api response more manageable on the front-end.

After that I moved onto the front-end. I began building the landing page and navbar. `react-router` and just using simple hooks (instead of anything more substantial like `redux`) felt appropriate given the scale of the app. I got a basic layout working and implemented the simple select that is populated by the query to the care-recipients endpoint.

Once a care-recipient is selected then the app navigates to the observations page and grabs the care recipient's id from the url, which it uses to send 2 api requests, one to fetch the observations and one to fetch the care-recipient. To make this second API request to fetch the care recipient feels more better than storing the care recipieint info in localstorage, for example, or implementing a large state management tool like `redux`, and then having the state there persist, because that feels like overkill. It also allows us to refresh the page once a care-recipient has been selected and nothing breaks.

Displaying the observations in a timeline felt most appropriate here so that a family member could see the history, with the most recent/relevant observations displayed first.

Once I had a list of observation on the observations page, I began impelmenting the pagination and the `react-select` at the top of the page to allow a family member to select exactly what kind of observations they wanted to see a history for. Multiple observation filters can be selected so they can choose as many or as few as they like. 

After this the MVP was basically done but I'd already used quite a lot of time, so I moved on to doing some very simple specs. I wrote request specs for each of my 3 endpoints to check that they were returning the correct info, and some unit tests for the React componenets where it felt appropriate to chekc that the logic in them was happening correctly and the correct elements were being ahown/hidden. I tested the landing page in a similair way and moved the get care recipients api request out into a hook which i could then mock to make the tests more robust.

I decided I had spent enough time on it at this point and moved onto deploaying the solution, and the url for this can be found above.

# things I'm happy with:
- the API structure and responses
- the front-end styling, nice and responsive
- the fact that it's deployed. I had some trouble with deploying both the front and back end from the same repo so had to separate them out into 2 sub repos.
- I used `react-select` and `sequelize` for the first time
- it's lightweight and has a small footprint
- the caregiver > observation/event relationship in the eventsController and subsequent fallback on the front-end.

# If I had more time:
- move the 2 API reqs in the observations page out into separate hooks files to allow me to...
- proper loading and error handling states
- test the observations page properly and mock the above hooks. I would normally do this and my proof of concept for this is the specs for the landing page.
- tidy up the types and setup in a few places.
- I would figure out how to deploy only this repo as the app, instead of separating it into 2 repos. 
- more specs for the back-end possibly, maybe for the models and controllers although the request specs feel appropriate.
- i would display a graph at the top of the page that tracks certain things over time, i.e. mood, fluid intake

# challenges
- deploying the app in one repo, it had to be separated out.
- the data wasn't great, lots of missing caregivers, necessitating a fallback on the front-end. there are events for a care recipient with an id that does not exist in the care-recipients table etc.