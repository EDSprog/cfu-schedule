# CFU schedule
**For all questions - devlet.seran@gmail.com**
## Table of Contents
- [Description](#description)
- [Tech information](#tech-information)
  * [Project stack](#project-stack)
  * [Accounts](#accounts)
## Description
`CFU schedule` is API for make students/teacher life easier: 
- Are you student?
  - you can see the schedule of your/another group and sort it by days/weeks/teachers or display the full !
  - you can take notes in the schedule for days/week/lesson!
  - this API help to learn changes in schedule!
- Are you group leader?
  - if you want notify you classmates about event for one click? No problem!
- Are you teacher?
  - you can edit schedule by day/week/forever and the group whose schedule you changed will be notified instantly:
    - change classroom
    - chenge lesson number
    - cancel a lesson
## Tech information
### Project stack
- Front-end : 
  - Vue.JS (https://ru.vuejs.org)
  - vue-router (https://router.vuejs.org/)
  - vee-validate (http://vee-validate.logaretm.com/)
  - vuex (https://vuex.vuejs.org)
  - vue-notification (https://github.com/euvl/vue-notification)
  - Bootstrap CSS (https://getbootstrap.com/)
  - Webpack (https://webpack.js.org/)

- Back-end:
  - Node (https://nodejs.org/en/)
  - restify (http://restify.com/)
  - Nginx (https://nginx.org/)
  - MongoDB (https://docs.mongodb.com/)
  - Mongoose ORM (http://mongoosejs.com/)

- Deploy:
  -Docker (https://www.docker.com/)
### Accounts
Types           | Special rights
----------------|---------------
**Admin**       | `create/delete/edit/verify`: accounts, schedule.
**Teacher**     | `edit` schedule, `notify` all groups about changes.
**Group leader**| `notify` classmates about event.
**Student**     | -
